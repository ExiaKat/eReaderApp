import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService{
  token: string = null;
  authenticate = new Subject<string>();
  hostUrl = "";

  constructor(private http: Http) {
    http.get('config.json').subscribe((res: Response) => {
      this.hostUrl = res.json().hostUrl;
    });
    console.log(this.hostUrl);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.hostUrl}/api/users/login`, {email, password})
      .do((res: Response) => {
        this.token = res.headers.get('x-auth');
        if (this.token) 
          window.sessionStorage.setItem('jwt', this.token);
        this.authenticate.next(this.token);
      });
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.hostUrl}/api/users`, {email, password})
      .do((res: Response) => {
        this.token = res.headers.get('x-auth');
        if (this.token)
          window.sessionStorage.setItem('jwt', this.token);
        this.authenticate.next(this.token);
      });
  }

  logout() {
    return this.http.delete(`${this.hostUrl}/api/users/logout`, {headers: new Headers({'x-auth': window.sessionStorage.getItem('jwt')})})
      .do((res: Response) => {
        window.sessionStorage.removeItem('jwt');
        this.token = null;
        this.authenticate.next(this.token);
      });
  }
}