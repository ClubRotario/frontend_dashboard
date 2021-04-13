import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/services/globals';
import { AuthService, Dashboard } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  get dashboard(): Dashboard{
    return this.authService.dashboard;
  }

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  getPostProfile( name: string ): string{
    if(name){
      return `${Globals.URL}/profiles/${name}`;
    }else{
      return null;
    }
  }

}
