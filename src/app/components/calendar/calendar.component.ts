import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() selectedDate = new EventEmitter<string>();
  @Input() date: string;


  constructor() { }

  ngOnInit(): void {

  }

  changeDate( date:any ){
    this.selectedDate.emit( date );
  }

}
