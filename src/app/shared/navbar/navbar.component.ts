import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface User {
  userId: number,
  name: string,
  lastName: string,
  email: string,
  role: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

}
