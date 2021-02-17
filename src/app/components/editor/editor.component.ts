import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Editor from '../../../assets/editor/ckeditor.js';

interface EditorInterface {
  data: string
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  Editor = Editor;

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
      uploadUrl: 'http://localhost:3300/api/posts/images/upload',
      withCredentials: false,
      // headers: {
      //   'X-CSRF-TOKEN': 'CSFR-Token',
      //    Authorization: 'Bearer <JSON Web Token>',
      // }
  },
  };  


  @Output() content = new EventEmitter<string>();
  @Input() data = '';


  constructor() { }

  ngOnInit(): void {
    if(this.data.length > 0){
      this.content.emit( this.data );
    }
  }

  changeData(){
    this.content.emit( this.data );
  }

}
