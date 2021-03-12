import { Injectable } from '@angular/core';
import { Globals } from '../services/globals';
import { HttpClient } from '@angular/common/http';

export interface UserInterface {
  user_id: number,
  fullName: string,
  email: string,
  phone: string,
  address: string,
  created_at: Date,
  last_login: Date,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  getManyUsers(){
    return this.http.get(`${Globals.URL}/api/users`).toPromise();
  }

  getUserByName( name: string ){
    return this.http.get( `${Globals.URL}/api/users/user?name=${name}` ).toPromise();
  }

  saveOneUser( user: any ){
    return this.http.post(`${Globals.URL}/api/users`, user ).toPromise();
  }

}
