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
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService.login(email, password)
      .subscribe((res: Response) => {
      }, err => { this.errorMessage = "Invalid email or password!"; });
  }

  onSignUp() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService.signup(email, password)
      .subscribe((res: Response) => {
      }, err => { this.errorMessage = "Failed to sign up!" });
  }

}
