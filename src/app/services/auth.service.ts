import { Injectable } from '@angular/core';

export interface UserInterface {
  userId: number,
  name: string,
  lastName: string,
  email: string,
  role: string,
  phone: string,
  country: string,
  address: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserInterface = {
    userId: 1,
    name: 'Angel Jose',
    lastName: 'Castillo Portillo',
    email: 'porillocastilloa@gmail.com',
    role: 'Administrador',
    phone: '50496556526',
    country: 'Honduras',
    address: 'Barrio san antonio, La paz, honduras'
  }

  constructor() { }
}
