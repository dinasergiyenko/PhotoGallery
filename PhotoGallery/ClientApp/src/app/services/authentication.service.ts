import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
  public currentUser: BehaviorSubject<User>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/Authentication/Login', { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.next(user);
        }

        return user;
      }));
  }

  register(user: User){
    return this.http.post('/api/Authentication/Register', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
}