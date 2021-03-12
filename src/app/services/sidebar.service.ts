import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from './globals';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  getSidebar(){
    const headers = new HttpHeaders({
      token: this.authService.getToken()
    })
    return this.http.get(`${Globals.URL}/api/auth/sidebar`, { headers }).toPromise();
  }
}
