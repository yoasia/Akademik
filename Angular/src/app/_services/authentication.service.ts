import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public id: number;

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = currentUser && currentUser.id;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post('/api/authenticate.php', JSON.stringify({ email: email, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const resp = response.json();

        const id = resp.user_id;
        const nickname = resp.nickname;
        const ds_number = resp.ds_number;
        const index_number = resp.index_number;
        const room_number = resp.room_number;
        const user_type = resp.user_type;

        if (id) {
          // set token property
          this.id = id;

          // store email and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email, id, nickname, ds_number, index_number, room_number, user_type }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.id = null;
    localStorage.removeItem('currentUser');
  }
}
