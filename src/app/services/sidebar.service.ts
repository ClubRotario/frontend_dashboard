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
      path: '/dashboard/posts/1',
      icon: 'dw-file',
      name: 'Posts'
    },
    {
      path: '/dashboard/users',
      icon: 'dw-user',
      name: 'Usuarios'
    },
    {
      path: '/dashboard/profile',
      icon: 'dw-user1',
      name: 'Mi Perfil'
    },
    {
      path: '/dashboard/categories',
      icon: 'dw-menu-2',
      name: 'Categorias'
    }

  ]
  constructor() { }
}
