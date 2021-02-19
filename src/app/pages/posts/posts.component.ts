import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, PostInterface } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: PostInterface[];
  public pagination: any;
  public postId: number;

  constructor( private postService: PostService, private activatedRoute: ActivatedRoute ) { }

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
    });
  }

  getEditPostUrl( id: any ){
    return `/dashboard/edit-post/${id}`
  }

}
