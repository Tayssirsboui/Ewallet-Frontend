import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Profile } from '../models/profile.model';
import { Utilisateur } from '../utilisateur';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateursUrl: string;

  constructor(private http: HttpClient) {
    this.utilisateursUrl = 'http://localhost:8080/utilisateurs';
  }
   findAll(): Observable<Utilisateur[]> {
    
    return this.http.get(this.utilisateursUrl+'/getAll' ).pipe(
      map((response:any) => response as Utilisateur[])
    );
  }

   save(utilisateur:Utilisateur) {
    
    return this.http.post<Utilisateur>(this.utilisateursUrl + "/saveUtilisateur", utilisateur);
  }
  
  modifierUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.put(`${this.utilisateursUrl}/${utilisateur.idUtilisateur}`, utilisateur);
  }

  supprimerUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.delete(`${this.utilisateursUrl}/deleteUtilisateur/${utilisateur.idUtilisateur}`);
  }
  
  getSoldeDeCompte(idUtilisateur:number): Observable<number> {
    return this.http.get<number>(`${this.utilisateursUrl}/soldeDeCompte/${idUtilisateur}`);
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.utilisateursUrl}/getProfile`);
  }

  updateProfile(profile:Profile): Observable<any>
  {
    return this.http.put<any>(`${this.utilisateursUrl}/updateProfile` , profile);

  }

}
