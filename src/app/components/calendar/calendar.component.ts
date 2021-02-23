import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() selectedDate = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
    console.log('calendar');
  }

  changeDate( date:any ){
    this.selectedDate.emit( date );
  }

}
