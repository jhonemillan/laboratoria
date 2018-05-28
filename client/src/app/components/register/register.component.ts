import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  processed = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { // <--- inject FormBuilder

    this.createForm();
  }

    createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]], // <--- the FormControl called "name"
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
      
    }, {validator: this.matchingPasswords('password', 'confirm')});
    }

    enableForm(){
      this.form.controls['username'].enable();
      this.form.controls['email'].enable();
      this.form.controls['password'].enable();
      this.form.controls['confirm'].enable();
    }

    disableForm(){
      this.form.controls['username'].disable()
      this.form.controls['email'].disable();
      this.form.controls['password'].disable();
      this.form.controls['confirm'].disable();
    }

    // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

    onRegisterSubmit(){
      this.processed = true;
      this.disableForm();
      const user = {
        email : this.form.get('email').value,
        username : this.form.get('username').value,
        password: this.form.get('password').value
      }
      
      this.authService.registerUser(user).subscribe(data => {
        if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processed = false;
          this.enableForm();
        }else{
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(() =>{
            this.router.navigate(['/login']);
          }, 2000)
        } 
      });

      
    }
  ngOnInit() {
  }

}
