import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import settings from '../../../settings';
import { UserModel } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new Subject<UserModel>();

  constructor(private http: HttpClient, private router: Router) {
  }

  isLogged(): Observable<{ success: boolean }> {
    return this.http.get<any>(settings.ENDPOINT_DEFAULT + 'api/login/isLogged', this.getHeaderWithToken());
  }

  setCurrentUser(user: UserModel) {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<UserModel> {
    return this.currentUser.asObservable();
  }

  getHeaderWithToken(): {} {

    const currentUserToken = this.getActiveUserLocalStorage();
    let headers = this.getHeaderDefault();

    if (currentUserToken && currentUserToken.token) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUserToken.token
      });
    }

    return { headers: headers };
  }

  getHeaderWithOutToken(): {} {

    const headers = this.getHeaderDefault();

    return { headers };
  }

  getActiveUserLocalStorage(): UserModel {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
      this.logout();
    } else {
      this.setCurrentUser(currentUser);
    }

    return currentUser;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setCurrentUser(undefined);
    this.router.navigate(['login']);
  }

  private getHeaderDefault(): HttpHeaders {
    return new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');
  }
}

