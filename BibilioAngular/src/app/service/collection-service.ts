import { Injectable, Service } from '@angular/core';
import { Collection } from '../model/collection';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {

   constructor(private http: HttpClient) {}

   url:string="//localhost:8080/api";


    public findAllObs(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.url}/collection`);
  }

    public deleteObs(value:Collection): Observable<void> {
    return this.http.delete<void>(`${this.url}/collection/${value.id}`);
  }

    public addObs(value:Collection): Observable<Collection> {
    return this.http.post<Collection>(`${this.url}/collection`, value);
  }

    public update(value:Collection): Observable<Collection> {
    return this.http.put<Collection>(`${this.url}/collection/${value.id }`,value);
  }
}
