import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Avis } from '../model/avis-interface';

@Injectable({
    providedIn: 'root',
})
export class AvisService {
    private apiUrl: string = "/avis";
    private http: HttpClient = inject(HttpClient);

    public findAll(): Observable<Avis[]> {
        return this.http.get<Avis[]>(this.apiUrl);
    }

    public save(avis: Avis): Observable<Avis> {
        if (!avis.id) {
            return this.http.post<Avis>(this.apiUrl, avis);
        }

        return this.http.put<Avis>(`${this.apiUrl}/${avis.id}`, avis);
    }

}
