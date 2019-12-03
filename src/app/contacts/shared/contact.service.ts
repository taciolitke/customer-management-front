import { Injectable } from '@angular/core';
import settings from 'src/settings';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/autentication/shared/auth.service';
import { Observable } from 'rxjs';
import { ContactModel } from './contact.model';
import { ContactFilterModel } from '../shared/contact-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  list(contactsFilter: ContactFilterModel): Observable<{ success: boolean, data: Array<ContactModel> }> {

    const queryString = contactsFilter ? Object.keys(contactsFilter).map(k =>
      contactsFilter[k] ? `${encodeURIComponent(k)}=${encodeURIComponent(contactsFilter[k])}` : '').join('&') : '';

    return this.http.get<any>(settings.ENDPOINT_DEFAULT + 'api/customer?' + queryString, this.authService.getHeaderWithToken());
  }
  count(): Observable<{ success: boolean, data: number }> {
    return this.http.get<any>(settings.ENDPOINT_DEFAULT + 'api/customer/count', this.authService.getHeaderWithToken());
  }
  getClassifications(): Observable<{ success: boolean, data: Array<string> }> {
    return this.http.get<any>(settings.ENDPOINT_DEFAULT + 'api/customer/classifications', this.authService.getHeaderWithToken());
  }

}
