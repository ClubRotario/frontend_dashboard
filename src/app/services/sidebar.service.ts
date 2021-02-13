import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  itemsMenu = [
    {
      path: '/dashboard',
      icon: 'dw-analytics-9',
      name: 'Dashboard'
    },
    {
      path: '/dashboard/posts',
      icon: 'dw-file',
      name: 'Posts'
    },
    {
      path: '/dashboard/users',
      icon: 'dw-user',
      name: 'Usuarios'
    }
  ]
  constructor() { }
}
