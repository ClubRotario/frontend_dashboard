import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Globals } from 'src/app/services/globals.js';
import * as Editor from '../../../assets/editor/ckeditor.js';
import { PostService } from '../../services/post.service';

interface EditorInterface {
  data: string
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  Editor = Editor;

  postIdSub: Subscription;

  editorConfig = {
    toolbar: {
      items: [
        'heading',
        'bold',
        'italic',
        'fontBackGroundColor',
        'fontColor',
        'fontSize',
        'fontFamily',
        '|',
        'alignment',
        'numberedList',
        'bulletedList',
        'outDent',
        'inDent',
        '|',
        'blockQuote',
        'imageUpload',
        'link',
        '|',
        'insertTable',
        'exportPdf',
        '|',
        'undo',
        'redo'

      ]
    },
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'es',
    simpleUpload: {
      uploadUrl: `https://lapazrotaryclub.org/api/posts/images/upload`,
      withCredentials: false,
      headers: {
        postId: 0,
      }
  },
  };  


  @Output() content = new EventEmitter<string>();
  @Input() data = '';


  constructor( private postService: PostService ) { }
  ngOnDestroy(): void {
    this.postIdSub.unsubscribe();
  }

  ngOnInit(): void {
    if(this.data){
      this.content.emit( this.data );
    }
    this.postIdSub = this.postService._postId.subscribe( (id: any) => {
      this.editorConfig.simpleUpload.headers.postId = id;
    });
  }

  changeData(){
    this.content.emit( this.data );
  }

}
