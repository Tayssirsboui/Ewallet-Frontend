import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depense } from '../models/depense.model';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  postFormData(formData: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/depenses';

  constructor(private http: HttpClient) { }

  saveDepense(formData: Depense): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveDepense`, formData);
  }

  getOwnDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseUrl}/getOwnDepenses`)
  }

 

  getDepenseById(id: number): Observable<Depense> {
    return this.http.get<Depense>(`${this.baseUrl}/getDepense/${id}`)
  }

  deleteDepense(depense:Depense): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDepenses/${depense.idDepense}`);
  }

  findLastDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseUrl}/getLastDepenses`);
  }

  getTotalDepenseAmount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalDepense`);
  }
  
  getPaiementsPrevus(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseUrl}/getPaiementsPrevus`);
  }

}
