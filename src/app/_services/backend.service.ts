import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from '../models/depense.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:8080/api/getLastDepenses'; 

  constructor(private http:HttpClient ) {}
  
  getDepense(): Observable<Depense[]> {
    return this.http.get<Depense[]>("http://localhost:8080/getDepenses");
  }

  findLastDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.apiUrl}/`);
  }
}
