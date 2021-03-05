import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../services/globals';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

export interface PostInterface{
  post_id: number,
  user_id: number,
  category_id: number
  title: string,
  content: string,
  published: boolean,
  created_at: Date,
  published_at: Date,
  description: string,
  profile: string
}

export interface CategoryInterface{
  category_id: number,
  category: string
}

@Injectable({
  providedIn: 'root'
})
export class PostService {


  _postId = new BehaviorSubject<string>('1');

  constructor( private http: HttpClient, private authService: AuthService ) { }

  createPost(title){
    const post = {
      title,
      user_id: this.authService.user.userId
    }
    return new Promise( (resolve, reject) => {
      this.http.post(`${Globals.URL}/api/posts`, post).subscribe( (res: any) =>{
        resolve(res);
      }, (error: any) => {
        reject(error);
      });
    });
  };

  getAllPosts(page = 1){
    return this.http.get(`${Globals.URL}/api/posts/${page}`);
  }

  getPostById( post_id: number ){
    return this.http.get(`${Globals.URL}/api/posts/one/${post_id}`);
  }

  setPostId( id: string ){
    this._postId.next( id );
  }

  updatePost( post: any ){
    post.updated_at = new Date();
    this.http.put(`${Globals.URL}/api/posts`, post ).subscribe( (res: any) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }

  updateProfile( file: any, post_id: number ){
    const updated_at = new Date();
    const formData = new FormData();
    formData.append('profile', file);
    formData.append('updated_at', updated_at.toString());
    formData.append('post_id', post_id.toString());
    return this.http.post(`${Globals.URL}/api/posts/profile`, formData).toPromise();
  }

  getCategories(){
    return this.http.get(`${Globals.URL}/api/posts/data/categories`);
  }

  publishPost( post_id: number, published: boolean ){
    return this.http.put(`${Globals.URL}/api/posts/publish`, {post_id, published}).subscribe( (res: any) => {
      console.log('Published!');
    }, (error: any) => {
      console.log(error);
    });
  }

  saveAsEntry(entry_date: Date, post_id: number, show: boolean){

    return this.http.put(`${Globals.URL}/api/posts/entry`, { entry_date, post_id, show }).toPromise();
  }

}
