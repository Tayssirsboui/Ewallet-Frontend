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

  createEvent(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData);
  }

  getDepense(): Observable<Depense[]> {
    return this.http.get<Depense[]>("http://localhost:8080/getDepenses")
  }

  // updateData(id: number, formData: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/data/${id}`, formData);
  // }
  // updateDepense(): Observable<Depense> {
  //   return this.http.put<Depense>("http://localhost:8080/updateDepenses");
    
  // }
  updateDepense(depense: Depense): Observable<Depense> {
    const url = `http://localhost:8080/updateDepenses`;
    return this.http.put<Depense>(url, depense);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/data/${id}`);
  }
}