import { Component, OnInit } from '@angular/core';
import { AuthService, UserInterface } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: UserInterface;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
    this.userDetails = this.authService.user;
  }

}
