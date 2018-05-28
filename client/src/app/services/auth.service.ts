import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {
 
  //domain = "http://localhost:3000";
  domain= "";
  authToken;
  user;
  options;

  constructor(private http: Http) { }



  createAuthenticationHeaders(){
  this.loadToken();
  this.options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'authorization': this.authToken 
    })
  });

  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
  }
   // Function to register user accounts
  registerUser(user) {
    // var headers =   new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.post(this.domain + '/authentication/register', user)
              .map(res => res.json());
  }

  loginUser(user){
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  islogged(){
   return tokenNotExpired();
  }

  storageUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);

    this.authToken = token;
    this.user = user;
  }

  getProfile(){
  this.createAuthenticationHeaders();
  return this.http.get(this.domain + '/authentication/profile', this.options).map(res=>res.json());
  }

}
