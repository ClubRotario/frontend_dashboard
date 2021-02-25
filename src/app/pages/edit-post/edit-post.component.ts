import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, PostInterface } from '../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

declare function initFunctions();

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

  calendar: string;

  time:any;

  constructor( private postService: PostService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) =>{
      this.postId = id;
      this.postService.setPostId( id );
      this.getOnePost();
    });
    initFunctions();
  }

  getOnePost(){
    this.postService.getPostById( this.postId ).subscribe( (res: any) =>{
      this.postDetails = res;
    })
  }


  publishPost( published: any ){
    if(!this.postDetails.post.description){
      published.checked = false;
      this.showAlert( 'Error al momento de publicar', 'Por favor complete la descripcion de post para poder publicarlo.', 'error' );
    }else if( !this.postDetails.post.content ){
      published.checked = false;
      this.showAlert( 'Error al momento de publicar', 'Agrega contenido a tu post antes de hacerlo visible.', 'error' );
    }else if(!this.postDetails.post.category_id){
      published.checked = false;
      this.showAlert( 'Error al momento de publicar', 'Selecciona una categoria antes de publicar el post.', 'error' );
    }else{
      this.postService.publishPost( this.postDetails.postId, this.postDetails.post.published );
    }
  }

  createEntry( entry: any ){
    if( !this.calendar ){
      Swal.fire({
        title: 'No se puede configurar la fecha',
        text: 'Por favor seleccione una fecha antes de agendar el post',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      entry.checked = false;
    }
  }

  setDate( event: any ){
    this.calendar = event;
  }

  setPostContent( event: string ){
    this.postDetails.post.content = event;
    this.autoSave();
  }

  //Colocar el valor proveniente del componente category
  setCategory( event: number ){
    this.postDetails.post.category_id = event;
    this.autoSave();
  }

  autoSave(){
    clearTimeout(this.time);
    this.time = setTimeout(() => {
        this.postService.updatePost( this.postDetails );
    }, 5000);
  }

  onChangeTitle(){
    if(!this.postDetails.post.title){
      this.showAlert('Error, a la hora de editar el post', 'Ingresa un titulo para poder continuar', 'error');
      this.getOnePost();
    }else{
      this.autoSave();
    }
  }


  //Metodo que se encarga de mostrar alertas
  showAlert( title: string = '', text: string = '', icon: any = 'warning'){
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar'
    });
  }

}
