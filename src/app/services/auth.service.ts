import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // private baseUrl='http://localhost:3000';

  private baseUrl = 'http://localhost:5075/api/Books/Login';
  //private baseUrl='http://localhost:5022/BookLogin'
  private baseUrl1='http://localhost:5075/api/Books/Register';


  constructor(private http: HttpClient) { }

  registerUser(userDetails:any) {
    return this.http.post(`${this.baseUrl1}`, userDetails);
  }
  Login(loginDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, loginDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }



}
