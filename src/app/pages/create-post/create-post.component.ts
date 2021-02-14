import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  content: string = '';

  contentHTML=`<p>Hola Mundo!</p>`

  constructor() { }

  ngOnInit(): void {
  }

  getContent( event ){
    this.content = event;
  }

  preview(){
    document.querySelector('#content').innerHTML = this.content;
  }

}
