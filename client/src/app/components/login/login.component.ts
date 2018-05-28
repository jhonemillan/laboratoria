import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  messageClass;
  message;
  processed = false;
  


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {  this.createForm(); }

  createForm(){
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  enableForm(){
      this.form.controls['username'].enable();      
      this.form.controls['password'].enable();      
    }

    disableForm(){
      this.form.controls['username'].disable()      
      this.form.controls['password'].disable();      
    }

  ngOnInit() {
  }

  onLoginSubmit(){
    this.processed = true;
    this.disableForm();

    //Crea el usuario con los valores de los input

    const user={
      username : this.form.get('username').value,
      password : this.form.get('password').value
    }

    this.authService.loginUser(user).subscribe(data=> {
      if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processed = false;
          this.enableForm();
        }else{
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          this.authService.storageUserData(data.token, user);
          setTimeout(() =>{
            this.router.navigate(['/dashboard']);
          }, 2000)
        }
    });
  }

}
