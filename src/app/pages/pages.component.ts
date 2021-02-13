import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  title: string;
  description: string;


  constructor(private router: Router) {
    this.getTitle();
  }

  ngOnInit(): void {
    
  }

  //Funcion para obtener la data que mandamos por las rutas
  getTitle(){
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
      map( (event: ActivationEnd) => event.snapshot.data )
    ).
    subscribe( ({ title, description }) =>{
      this.title = title;
      this.description = description;
      document.title = `Routary | ${title}`;
    });
  }

}
