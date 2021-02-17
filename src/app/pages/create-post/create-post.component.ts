import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Globals } from '../../services/globals';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  content: string = '';

  contentHTML=``

  constructor( private postService: PostService, private router: Router ) { }

  ngOnInit(): void {
    this.postTitle();
  }

  getContent( event ){
    this.content = event;
  }

  preview(){
    document.querySelector('#content').innerHTML = this.content;
  }

  postTitle(){
    Swal.fire({
      title: 'Ingrese el título del post a crear',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1b00ff',
      cancelButtonColor: '#dc3545',
      preConfirm: (title: string) => {
        return this.postService.createPost( title );
      },
      
    }).then((result) => {
      if(!result.isConfirmed){
        this.router.navigateByUrl('/dashboard/posts/1')
      }
    })
  }

}
