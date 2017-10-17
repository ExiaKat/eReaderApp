import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  token: string = "";
  authenticate = new Subject<string>();
  localhost = "localhost";

  constructor(private http: Http) {}

  login(email: string, password: string) {
    return this.http.post(`http://${this.localhost}:3000/api/users/login`, {email, password})
      .do((res: Response) => {
        this.token = res.headers.get('x-auth');
        window.sessionStorage.setItem('jwt', this.token);
        this.authenticate.next(this.token);
      });
  }

  signup(email: string, password: string) {
    return this.http.post(`http://${this.localhost}:3000/api/users`, {email, password})
      .do((res: Response) => {
        this.token = res.headers.get('x-auth');
        window.sessionStorage.setItem('jwt', this.token);
        this.authenticate.next(this.token);
      });
  }

  logout() {
    return this.http.delete(`http://${this.localhost}:3000/api/users/logout`, {headers: new Headers({'x-auth': window.sessionStorage.getItem('jwt')})})
      .do((res: Response) => {
        window.sessionStorage.removeItem('jwt');
        this.token = "";
        this.authenticate.next("");
      });
  }

  isAuthenticated() {
    return this.token !== "" ? true : false;
  }
}