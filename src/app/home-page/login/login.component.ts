import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = "";
  @ViewChild("fmLogin") loginForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.authService.login(email, password)
        .subscribe((res: Response) => {
        }, err => { this.errorMessage = "Incorrect email or password"; });
    } else {
      this.errorMessage ="Please enter valid email and password!";
      this.clearErrorMessage();
    }
    
  }

  onSignUp() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.authService.signup(email, password)
        .subscribe((res: Response) => {
        }, err => { this.errorMessage = "The email already exists!" });
    } else {
      this.errorMessage = "Please enter valid email and password!";
      this.clearErrorMessage();
    }    
  }

  clearErrorMessage() {
    setTimeout(() => {
      this.errorMessage = "";
    }, 2000);
  }

}
