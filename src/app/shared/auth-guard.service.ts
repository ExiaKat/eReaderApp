import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../home-page/login/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) : Promise<boolean> | Observable<boolean> | boolean {
    if (window.sessionStorage.getItem('jwt')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}