import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, PostInterface } from '../../services/post.service';
import { FormGroup, FormBuilder } from '@angular/forms';

interface PostDetailsInterface{
  post: {
    category: string,
    category_id: number,
    content: string,
    description: string,
    post_id: number,
    published: boolean,
    published_at: Date,
    tag_id: number,
    title: string,
    updated_at: Date,
    user_id: number
  },
  postId: number
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postId: number;
  postDetails: PostDetailsInterface;
  
  formGroup: FormGroup

  constructor( private postService: PostService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) =>{
      this.postId = id;
      this.getOnePost();
    });
    this.formLoad();
  }

  getOnePost(){
    this.postService.getPostById( this.postId ).subscribe( (res: any) =>{
      this.postDetails = res;
      console.log(this.postDetails);
    })
  }

  formLoad(){
    this.formGroup = this.formBuilder.group({
      title: [''],
      description: ['']
    });

    //Switchery call
    document.querySelectorAll('.js-switch').forEach( (element) => {
      // let switchery = new Switchery(element);
    })
  }

  onSubmit(){

  }

}
