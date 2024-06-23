import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  private baseUrl = 'http://localhost:8080/api/organisms';

  constructor(private http: HttpClient) { }

  getOrganisms(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getOrganismIdByCode(organismCode: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/code/${organismCode}/id`);
  }
}
