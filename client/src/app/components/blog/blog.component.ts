import { BlogService } from './../../services/blog.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
  
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  blogsPosts;
  username;
  description:string;
  form;

  constructor(
    private authService: AuthService,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
    });

    this.getAllBlogs();
  }

  getAllBlogs(){
    
    this.blogService.getAllBlogs().subscribe(data => { 
    this.blogsPosts = data.blogs;    
    });     
   }

  onBlogSubmit(){
    const blog = {
      username: this.username,
      description: this.description
    }
    

    this.blogService.newBlog(blog).subscribe(blog => {
      this.getAllBlogs();
    });

    this.description = '';
  }

  onDeleteBlog(id){
    this.blogService.deleteBlog(id).subscribe(blog => {
      this.getAllBlogs();
    });
  }

}
