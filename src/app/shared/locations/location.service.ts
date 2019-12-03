import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocationModel } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getRegions(): Observable<Array<LocationModel>> {

    const endpoint = 'https://restcountries.eu/rest/v2/all';

    return this.http.get<any>(endpoint, {});
  }
}
