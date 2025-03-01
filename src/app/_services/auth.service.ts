import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + '/auth/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + '/auth/signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  registerUser(organismId: string, signupRequest: any): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/signup/' + organismId + '/organism', signupRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signout`, {}, { withCredentials: true });
  }
}
