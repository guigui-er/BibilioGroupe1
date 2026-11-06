import { Injectable, Service } from '@angular/core';
import { Editeur } from '../model/editeur';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditeurService {


  constructor(private http: HttpClient) {}

   url:string="//localhost:8080/api";


    public findAllObs(): Observable<Editeur[]> {
    return this.http.get<Editeur[]>(`${this.url}/editeur`);
  }

    public deleteObs(value:Editeur): Observable<void> {
    return this.http.delete<void>(`${this.url}/editeur/${value.id}`);
  }

    public addObs(value:Editeur): Observable<Editeur> {
    return this.http.post<Editeur>(`${this.url}/editeur`, value);
  }

    public update(value:Editeur): Observable<Editeur> {
    return this.http.put<Editeur>(`${this.url}/editeur/${value.id }`,value);
  }
}
