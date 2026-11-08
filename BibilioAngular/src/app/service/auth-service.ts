import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthResponse } from '../model/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string = sessionStorage.getItem('token') ?? "";

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  constructor(private http: HttpClient) {
  }

  public login(auth: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/user/auth', auth);
  }
}
