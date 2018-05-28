import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router){}

  canActivate() {
    if(this.authService.islogged()){
        this.router.navigate(['/']);
        return false;
    }else{      
      return true;
    }
  }
}