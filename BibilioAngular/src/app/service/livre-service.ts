import { Injectable, Service } from '@angular/core';
import { Livre } from '../model/livre';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LivreService {

   constructor(private http: HttpClient) {}

   url:string="//localhost:8080/api";


    public findAllObs(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.url}/Livre`);
  }

    public deleteObs(value:Livre): Observable<void> {
    return this.http.delete<void>(`${this.url}/Livre/${value.id}`);
  }

    public addObs(value:Livre): Observable<Livre> {
    return this.http.post<Livre>(`${this.url}/Livre`, value);
  }

    public update(value:Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.url}/Livre/${value.id }`,value);
  }
}
