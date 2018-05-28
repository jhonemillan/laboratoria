import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService,
              private router : Router) { }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/'])
  }

  isLogged(){
    return this.authService.islogged();
  }
  

  ngOnInit() {
  }

}
