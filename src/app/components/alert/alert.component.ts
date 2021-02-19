import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input('type')type = "primary";
  @Input('text')text = "Este es el texto de la alerta";

  constructor() { }

  ngOnInit(): void {
  }

  get alert(){
    return `alert-${ this.type }`
  }

}
