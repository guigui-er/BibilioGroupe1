import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {


  constructor(private http: HttpClient) {
  }

  public subscribe(auth: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/user/subscribe', auth);
  }
}
