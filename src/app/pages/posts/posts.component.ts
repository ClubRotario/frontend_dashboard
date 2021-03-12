import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/services/globals';
import { PostService, PostInterface } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: PostInterface[];
  public pagination: any;
  public postId: number;
  public myPosts: boolean;

  constructor( private postService: PostService, private activatedRoute: ActivatedRoute, public authService: AuthService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) =>{
      this.postId = id;
      this.getAllPosts();
    });
  }

  getAllPosts(){
    console.log(this.postId);
    this.postService.getAllPosts( this.postId ).subscribe( (res: any) =>{
      this.posts = res.posts;
      this.pagination = res.pagination;
      this.posts.map( (post: PostInterface) => {
        if(post.profile){
          post.profile = `${Globals.URL}/profiles/${post.profile}`;
        }
      });
    });
  }

  getEditPostUrl( id: any ){
    return `/dashboard/edit-post/${id}`
  }

  onMyPosts(){
    if(this.myPosts){
      this.postService.getAllPosts( 1, true ).subscribe( (res: any) => {
        this.posts = res.posts;
        this.posts.map( (post: PostInterface) => {
          if(post.profile){
            post.profile = `${Globals.URL}/profiles/${post.profile}`;
          }
        });
      });
    }else{
      this.getAllPosts();
    }
  }

  deletePost( post_id: number ){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar este post?',
      showCancelButton: true,
      confirmButtonText: `Si, eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.postService.deletepost(  post_id ).then( (res: any) => {
          Swal.fire('Post eliminado correctamente', '', 'success');
          this.onMyPosts();
        }).catch( (error: any) => {
          console.log(error);
        })
      } 
    })
  }

}
