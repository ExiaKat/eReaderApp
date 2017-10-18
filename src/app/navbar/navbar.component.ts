import { Component, OnInit } from '@angular/core';
import { AuthService } from '../home-page/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggle = false;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = window.sessionStorage.getItem('jwt') ? true : false;
    this.authService.authenticate.subscribe(token => {
      this.isAuthenticated = token !== "" ? true : false;
    });
  }

  onToggleMenu() {
    this.toggle = !this.toggle;
  }

  onToggleMenuClass() {
    return this.toggle ? "in" : "";
  }

  onLogout() {
    this.authService.logout()
      .subscribe(() => {
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      });
  }

}
