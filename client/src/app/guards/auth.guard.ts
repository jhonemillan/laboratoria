import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router){}

  canActivate() {
    if(this.authService.islogged()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}