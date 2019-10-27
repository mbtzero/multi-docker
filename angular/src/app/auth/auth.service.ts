import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})   // instead of adding to providers - only one instance for the whole app
export class AuthService {
  private isAuthenticated = false;
  private postsUpdated = new Subject<User[]>();
  private token: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  baseURL = ''
  //postAPI = 'http://localhost:8080/api/user/';
 // postAPI = 'http://mygreenprofile.com/api/user/';
  postAPI = this.baseURL + '/api/user';

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addUser(email: string, password: string) {
    const user: User = { id: null, email: email, password: password};

    this.http.post<{message: string}>(this.postAPI + '/signup', user).
      subscribe( (responseData) => {
        this.router.navigate(["/"]);
    });
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string) {
    const user: User = { id: null, email: email, password: password};

    this.http.post<{token: string, userId: string}>(this.postAPI + '/login', user).
    subscribe( (response) => {
      const token = response.token;
      this.token = token;

      if (token) {
        this.isAuthenticated = true;
        this.userId = response.userId;
      }

      this.authStatusListener.next(true);
      this.router.navigate(["/"]);
    });
  }

}
