import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Auteur } from '../model/auteur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuteurService {
    private apiUrl: string = "http://localhost:8080/api/auteur";
    constructor(private http: HttpClient) {
    }

    public findAll(): Observable<Auteur[]> {
        return this.http.get<Auteur[]>(this.apiUrl);
    }

    public save(auteur: Auteur): Observable<Auteur> {
        if (!auteur.id) {
        return this.http.post<Auteur>(this.apiUrl,auteur);
        }

        return this.http.put<Auteur>(`${ this.apiUrl }/${ auteur.id }`, auteur);
    }

    public removeAuteur(auteur: Auteur): Observable<void> {
        return this.http.delete<void>(`${ this.apiUrl }/${ auteur.id }`);
    }




}
