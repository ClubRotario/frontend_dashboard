import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Globals } from './globals';

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

  constructor( private http: HttpClient ) { }

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

  saveToken( token: string ){
    localStorage.setItem('token', token);
  }

  getToken(){
    return (localStorage.getItem('token')? localStorage.getItem('token'): '' );
  }

  deleteToken(){
    localStorage.removeItem('token');
  }
}
