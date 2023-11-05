import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/task';

  constructor(private http: HttpClient) {}

  resetPassword(email: ResetPassword): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/users/resetPassword`, email, {
      headers: headers,
      observe: 'response',
    });
  }

  login(loginInfo: LoginRequest): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/auth/login`, loginInfo, {
      headers: headers,
      observe: 'response',
    });
  }

  registerUser(newUser: LoginRequest): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.baseUrl}/users`, newUser, {
      headers: headers,
      observe: 'response',
    });
  }
}
