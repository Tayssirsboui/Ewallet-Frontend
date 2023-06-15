import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Categorie } from '../categorie';


@Injectable({
  providedIn: 'root'
})
export class CategorieService{
  private categoriesUrl: string;


  constructor(private http: HttpClient) {
    this.categoriesUrl = 'http://localhost:8080/categories';
  }
  public findAll(): Observable<Categorie[]> {
   
    return this.http.get(this.categoriesUrl +"/getAll" ).pipe(
      map((response:any) => response as Categorie[])
    );
  }

  public save(categorie:Categorie) {
    return this.http.post<Categorie>(this.categoriesUrl + "/saveCategorie", categorie);
  }
  public updateCategories(categorie: Categorie): Observable<any> {
    return this.http.put(`${this.categoriesUrl}/${categorie.idCategorie}`, categorie);
  }

  public deleteCategories(utilisateur: Categorie): Observable<any> {
    return this.http.delete(`${this.categoriesUrl}/${utilisateur.idCategorie}`);
  }
 
}
