import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Utilisateur } from '../utilisateur';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateursUrl: string;

  constructor(private http: HttpClient) {
    this.utilisateursUrl = 'http://localhost:8080/';
  }
  public findAll(): Observable<Utilisateur[]> {
    
    return this.http.get(this.utilisateursUrl+'utilisateurs' ).pipe(
      map((response:any) => response as Utilisateur[])
    );
  }

  public save(utilisateur:Utilisateur) {
    
    return this.http.post<Utilisateur>(this.utilisateursUrl , utilisateur);
  }
  
  modifierUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.put(`${this.utilisateursUrl}/${utilisateur.idUtilisateur}`, utilisateur);
  }

  supprimerUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.delete(`${this.utilisateursUrl}/deleteUtilisateur/${utilisateur.idUtilisateur}`);
  }
}
