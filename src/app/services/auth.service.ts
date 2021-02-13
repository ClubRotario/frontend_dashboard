import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = {
    userId: 1,
    name: 'Angel Jose',
    lastName: 'Castillo Portillo',
    email: 'porillocastilloa@gmail.com',
    role: 'Administrador'
  }

  constructor() { }
}
