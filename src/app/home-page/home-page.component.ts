import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = window.sessionStorage.getItem('jwt') ? true : false;
    this.subscription = this.authService.authenticate.subscribe(token => {
      this.isAuthenticated = token !== "" ? true : false;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout()
      .subscribe((res: Response) => {
        if (res.status !== 200)
          alert("failed to log out!");
      })
  }

}
