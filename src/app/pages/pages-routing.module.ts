import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard', description: 'Aquí podrás ver un resumen en general del sistema, cuantos posts se han creado, cuáles fueron los últimos posts que se crearon así como los usuarios registrados en el sistema.', image: 'dashboard.svg' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil', description: 'Gestiona tu información personal, cambia tu contraseña para ingresar al sistema si lo consideras necesario.', image: 'profile.svg' } },
      { path: 'posts/:id', component: PostsComponent, data: { title: 'Posts', description: 'Gestiona los posts que se han creado, decido si quieres que estén visibles al publico o si lo prefieres edítalos o elimínalos.', image: 'blog.svg' }},
      { path: 'users', component: UsersComponent, data: { title: 'Usuarios', description: 'Controla los usuarios que pueden acceder al sistema, crea una cuenta de ser necesario o si deseas que un usuario no inicie sesión mas en el sistema puedes eliminarlo.', image: 'users.svg' }},
      { path: 'create-post', component: CreatePostComponent, data: { title: 'Crea un Nuevo Post', description: 'Cuenta una actividad, hazle saber a tus visitantes todo lo que realizas mediante un post, lo que publiques aquí será visible para todas las personas que ingresen al sitio web en el apartado de ‘Blog’.', image: 'post.svg' }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
