import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, PostInterface } from '../../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Globals } from 'src/app/services/globals';

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
    user_id: number,
    profile: string,
    entry?: boolean,
    entry_date?: Date
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
      if(this.postDetails.post.profile){
        this.postDetails.post.profile = `${Globals.URL}/profiles/${this.postDetails.post.profile}`;
      }
      if(this.postDetails.post.entry){
        this.calendar = this.postDetails.post.entry_date.toString();
      }
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
    }else{
      const date = new Date(this.calendar);
      this.postService.saveAsEntry(date, this.postDetails.postId, entry.checked).then( (res: any) => {
        this.showAlert('Correcto', 'Agenda modifcada correctamente', 'success');
        if(!entry.checked){
          this.calendar = '';
          this.postDetails.post.entry = false;
          this.postDetails.post.entry_date = null;
        }
      }).catch( (error: any) => {
        console.log(error);
        entry.checked = false;
      });
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

  //Metodo para actualizar la imagen
  updateProfile( event: any, profile: any ){
    const file = event.target.files[0];
    const { type } = file;
    if(type.substr(0, 5) !== 'image'){
      this.showAlert( 'Error al momento de subir la imagen', 'La imagen seleccionada no esta admitida, asegurese que sea una imagen y no otro tipo de archivo', 'error' );
      profile.value = '';
      return;
    }else{
      this.postService.updateProfile( file, this.postDetails.postId ).then( (res: any) => {
        this.postDetails.post.profile = res.url;
      }).catch( (error: any) => {
        console.log(error);
      })
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
