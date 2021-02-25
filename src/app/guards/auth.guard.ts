import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService , private router: Router){}

  canActivate():any {
    return this.authService.isLoggedIn().pipe(map(()=> true), catchError(() => {
      this.authService.deleteToken();
      return of(this.router.navigateByUrl('/login')); 
    }));
  }
  
}
