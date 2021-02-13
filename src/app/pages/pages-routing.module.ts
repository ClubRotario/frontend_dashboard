import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard', description: 'Aquí podrás ver un resumen en general del sistema, cuantos posts se han creado, cuáles fueron los últimos posts que se crearon así como los usuarios registrados en el sistema.' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil', description: 'Gestiona tu información personal.' } },
      { path: 'posts', component: PostsComponent, data: { title: 'Posts', description: 'Gestiona los posts que se han creado, decido si quieres que estén visibles al publico o si lo prefieres edítalos o elimínalos.' }},
      { path: 'users', component: PostsComponent, data: { title: 'Usuarios', description: 'Controla los usuarios que pueden acceder al sistema, crea una cuenta de ser necesario o si deseas que un usuario no inicie sesión mas en el sistema puedes eliminarlo.' }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
