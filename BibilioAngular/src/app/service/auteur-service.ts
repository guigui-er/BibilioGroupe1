import { Auteur } from './../model/auteur';
import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuteurService {

   constructor(private http: HttpClient) {}

   url:string="//localhost:8080/api";


    public findAllObs(): Observable<Auteur[]> {
    return this.http.get<Auteur[]>(`${this.url}/auteur`);
  }

    public findObs(value:number): Observable<Auteur> {
    return this.http.get<Auteur>(`${this.url}/auteur/${value}`);
  }

    public deleteObs(value:Auteur): Observable<void> {
    return this.http.delete<void>(`${this.url}/auteur/${value.id}`);
  }

    public addObs(value:Auteur): Observable<Auteur> {
    return this.http.post<Auteur>(`${this.url}/auteur`, value);
  }

    public update(value:Auteur): Observable<Auteur> {
    return this.http.put<Auteur>(`${this.url}/auteur/${value.id }`,value);
  }
}
