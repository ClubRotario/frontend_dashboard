import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HttpClientModule } from '@angular/common/http';
import { EditPostComponent } from './edit-post/edit-post.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { NoimagePipe } from './pipes/noimage.pipe';



@NgModule({
  declarations: [PagesComponent, DashboardComponent, ProfileComponent, PostsComponent, UsersComponent, CreatePostComponent, EditPostComponent, CategoriesComponent, NoimagePipe],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PagesModule { }
