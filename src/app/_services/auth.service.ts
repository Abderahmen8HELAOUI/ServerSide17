import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  registerUser(organismId: string, signupRequest: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup/' + organismId + '/organism', signupRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signout`, {}, { withCredentials: true });
  }
}
