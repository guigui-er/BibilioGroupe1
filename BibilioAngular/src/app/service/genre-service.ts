import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Editeur } from '../model/editeur';
import { Observable } from 'rxjs';
import { Genre } from '../model/genre';

@Injectable({
  providedIn: 'root',
})
export class GenreService {

  constructor(private http: HttpClient) {}

   url:string="//localhost:8080/api";


    public findAllObs(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.url}/genre`);
  }

    public deleteObs(value:Genre): Observable<void> {
    return this.http.delete<void>(`${this.url}/genre/${value.id}`);
  }

    public addObs(value:Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.url}/genre`, value);
  }

    public update(value:Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.url}/genre/${value.id }`,value);
  }



}
