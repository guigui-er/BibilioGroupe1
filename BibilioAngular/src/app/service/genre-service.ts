import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../model/genre';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
 //private apiUrl: string = "http://localhost:8080/api/genre";
  private apiUrl: string = "/genre";
  private http: HttpClient = inject(HttpClient);

  public findAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  public save(genre: Genre): Observable<Genre> {
    if (!genre.id) {
      return this.http.post<Genre>(this.apiUrl, genre);
    }

    return this.http.put<Genre>(`${ this.apiUrl }/${ genre.id }`, genre);
  }

  public remove(genre: Genre): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ genre.id }`);
  }
}
