import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Organism} from "../models/organism.model";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getOrganisms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/organisms`);
  }

  getOrganismIdByCode(organismCode: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/code/${organismCode}/id`,
        { responseType: 'text' as 'json' }
    ).pipe(
        catchError((error: any) => {
          console.error('Error fetching organism ID:', error);
          throw error;
        })
    );
  }

  createOrganism(organism: Organism): Observable<Organism> {
    return this.http.post<Organism>(`${this.baseUrl}/organisms/create`, organism, httpOptions);
  }
}
