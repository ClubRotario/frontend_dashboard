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

  getManyUsers( page:number = 1 ){
    return this.http.get(`${Globals.URL}/api/users?page=${page}`).toPromise();
  }

  getUserByName( name: string ){
    return this.http.get( `${Globals.URL}/api/users/user?name=${name}` ).toPromise();
  }

  saveOneUser( user: any ){
    return this.http.post(`${Globals.URL}/api/users`, user ).toPromise();
  }

  deleteUser( id:number ){
    return this.http.delete(`${Globals.URL}/api/users/${id}`).toPromise();
  }

}
