import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  title: string;
  description: string;
  image: string;


  constructor(private router: Router, private authService: AuthService) {
    this.getTitle();
  }

  ngOnInit(): void {
      this.authService.getUserDetails();
  }
  
  get imagePath(){
    return `assets/images/${this.image || 'team.svg'}`;
  }

  //Funcion para obtener la data que mandamos por las rutas
  getTitle(){
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
      map( (event: ActivationEnd) => event.snapshot.data )
    ).
    subscribe( ({ title, description, image }) =>{
      this.title = title;
      this.description = description;
      this.image = image;
      document.title = `Routary | ${title}`;
    });
  }

}
