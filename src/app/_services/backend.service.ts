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

  getAllDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseUrl}/getDepenses`)
  }

 

  getDepenseById(id: number): Observable<Depense> {
    return this.http.get<Depense>(`${this.baseUrl}/getDepense/${id}`)
  }

  deleteData(depense:Depense): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteDepenses/${depense.idDepense}`);
  }

  findLastDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>("http://localhost:8080/getLastDepenses");
  }

  getTotalDepenseAmount(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/totalDepense");
  }
  
  getPaiementsPrevus(): Observable<Depense[]> {
    return this.http.get<Depense[]>("http://localhost:8080/getPaiementsPrevus");
  }

}
