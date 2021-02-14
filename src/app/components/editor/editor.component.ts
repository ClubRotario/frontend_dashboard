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
