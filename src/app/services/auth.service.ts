import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Globals } from './globals';
import { Router } from '@angular/router';

export interface UserInterface {
  userId: number,
  name: string,
  last_name: string,
  email: string,
  role: string,
  phone: string,
  address: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserInterface;

  _user = new BehaviorSubject<UserInterface>({ name: '', last_name: '', email: '', phone: '', userId: 0, address: '', role: '' });

  constructor( private http: HttpClient, private router: Router ) { }

  login( user ){
    return this.http.post(`${Globals.URL}/api/auth/login`, user);
  }

  getUserDetails(){
      const headers = new HttpHeaders({
        token: this.getToken()
      })
      this.http.get(`${Globals.URL}/api/auth/details`, { headers }).subscribe( (res: any) => {
        this.user = res.userDetails;
        this._user.next( this.user );
      }, (error: any) => {
        console.log(error);
      })
  }

  logOut(){
    this.deleteToken();
    this.router.navigateByUrl('/login');
  }

  passwordRecovery(email: string){
    return this.http.post(`${Globals.URL}/api/auth/recovery`, { email });
  }

  codeVerification(code: number, user_id: number){
    return this.http.post(`${Globals.URL}/api/auth/verify/code`, { code, user_id })
  }

  saveToken( token: string ){
    localStorage.setItem('token', token);
  }

  updatePassword( password: string, user_id: number ){
    return this.http.put(`${Globals.URL}/api/auth/password`, { password, user_id });
  }

  getToken(){
    return (localStorage.getItem('token')? localStorage.getItem('token'): '' );
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  setEmail( email: string ){
    localStorage.setItem('email', email);
  }

  getEmail(){
    if( localStorage.getItem('email') ){
      return localStorage.getItem('email');
    }
  }

  removeEmail(){
    localStorage.removeItem('email');
  }

  isLoggedIn(){
    const headers = new HttpHeaders({
      token: this.getToken()
    });
    return this.http.get(`${Globals.URL}/api/auth/is-logged`, { headers });
  }
}
