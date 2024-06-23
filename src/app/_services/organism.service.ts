import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  private baseUrl = 'https://livredecaisseserverside-a315e713e62c.herokuapp.com/api/organisms';

  constructor(private http: HttpClient) { }

  getOrganisms(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getOrganismIdByCode(organismCode: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/code/${organismCode}/id`);
  }
}
