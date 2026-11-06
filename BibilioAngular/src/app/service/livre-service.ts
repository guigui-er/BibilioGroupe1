import { Injectable, Service } from '@angular/core';
import { Livre } from '../model/livre';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LivreService {

   constructor(private http: HttpClient) {}

   //url:string="//localhost:8080/api";
   private apiUrl: string = "/Livre";


    public findAll(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.apiUrl}`);
  }

    public remove(value:Livre): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${value.id}`);
  }

   /* public addObs(value:Livre): Observable<Livre> {
    return this.http.post<Livre>(`${this.url}/Livre`, value);
  }

    public update(value:Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.url}/Livre/${value.id }`,value);
  }*/



    public save(livre: Livre): Observable<Livre> {

      console.log(livre.id);
      if (!livre.id) {
        return this.http.post<Livre>(`${this.apiUrl}`, livre);
      }

      return this.http.put<Livre>(`${this.apiUrl}/${livre.id }`,livre);
    }

}
