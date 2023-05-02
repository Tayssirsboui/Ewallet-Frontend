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
    this.categoriesUrl = 'http://localhost:8080/categories/getAll';
  }
  public findAll(): Observable<Categorie[]> {
   
    return this.http.get(this.categoriesUrl, ).pipe(
      map((response:any) => response as Categorie[])
    );
  }

  public save(categorie:Categorie) {
    return this.http.post<Categorie>(this.categoriesUrl, categorie);
  }
 
}
