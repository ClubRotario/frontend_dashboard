import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, UserInterface } from '../../services/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserInterface;

  userSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.userSub = this.authService._user.subscribe( (res: UserInterface) => {
      this.user = res;
    })
  }

}
