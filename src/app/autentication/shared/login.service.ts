import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';
import settings from 'src/settings';
import { LoginModel } from './login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(login: LoginModel): Observable<{ success: boolean, data: UserModel, message: string }> {
    return this.http.post<any>(settings.ENDPOINT_DEFAULT + 'api/login', login,
      this.authService.getHeaderWithOutToken());
  }
}
