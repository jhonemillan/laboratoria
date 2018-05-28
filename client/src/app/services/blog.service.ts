import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'


@Injectable()
export class BlogService {

  domain = this.authService.domain;
  options;

  constructor(private authService: AuthService,
              private http: Http
             ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }
  
  //crea un nuevo post
  newBlog(blog){
  this.createAuthenticationHeaders();
  console.log('newblog method ' + this.domain);

  return this.http.post(this.domain + '/blogs/new', blog, this.options).map(res=> res.json());
  }

    // Function to get all blogs from the database
  getAllBlogs() {
    this.createAuthenticationHeaders(); // Create headers    
    return this.http.get(this.domain + '/blogs/allBlogs', this.options).map(res => res.json());
  }

   // Function to delete a blog
  deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + '/blogs/blog/' + id, this.options).map(res => res.json());
  }


}
