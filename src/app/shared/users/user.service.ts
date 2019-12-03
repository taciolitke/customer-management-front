import { Injectable } from '@angular/core';
import settings from 'src/settings';
import { AuthService } from 'src/app/autentication/shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSellers(): Observable<{ success: boolean, data: Array<string> }> {
    return this.http.get<any>(settings.ENDPOINT_DEFAULT + 'api/user/sellers', this.authService.getHeaderWithToken());
  }
}
