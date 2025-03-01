import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organism} from "../models/organism.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  createOrganism(organism: Organism): Observable<Organism> {
    return this.http.post<Organism>(`${this.baseUrl}/create`, organism, httpOptions);
  }
}
