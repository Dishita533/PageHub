import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // private baseUrl='http://localhost:3000';

  //private baseUrl = 'http://localhost:5075/api/Books/Login';
  private baseUrl='http://localhost:5022/BookLogin'
  //private baseUrl1='http://localhost:5075/api/Books/Register';
  private baseUrl1='http://localhost:5022/bookregistration'


  constructor(private http: HttpClient) { }

  // Store the token in sessionStorage
  // setToken(token: string): void {
  //   sessionStorage.setItem('token', token);
  // }

  // Retrieve the token from sessionStorage
  // getToken(): string | null {
  //   return sessionStorage.getItem('token');
  // }

  // Clear the token from sessionStorage (logout functionality)
  // clearToken(): void {
  //   sessionStorage.removeItem('token');
  // }
  registerUser(userDetails:any) {
    return this.http.post(`${this.baseUrl1}`, userDetails);
  }
  Login(loginDetails: login): Observable<any> {
     // Read the token from sessionStorage (or localStorage)
     const token = sessionStorage.getItem('token');
    
     // Add the Bearer token to the headers
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}`,loginDetails,{headers});
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }



}
