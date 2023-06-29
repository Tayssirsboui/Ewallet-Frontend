import { Injectable } from '@angular/core';
import {Revenu} from '../models/revenu.model'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RevenusService {

  
  postFormData(formData: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/revenus';

  constructor(private http: HttpClient) { }

 

  saveRevenu(formData: Revenu): Observable<Revenu[]> {
    return this.http.get<Revenu[]>("http://localhost:8080/saveRevenu")
  }


  updateRevenu(): Observable<Revenu[]> {
    return this.http.get<Revenu[]>("http://localhost:8080/updateRevenu")
  }
  deleteRevenuById(): Observable<Revenu[]> {
    return this.http.get<Revenu[]>("http://localhost:8080/deleteRevenu/{id}")
  }
  getAllRevenus(): Observable<Revenu[]> {
    return this.http.get<Revenu[]>("http://localhost:8080/revenus")
  }

  getTotalRevenuAmount(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/totalRevenu");
  }

  getRevenusById(): Observable<Revenu[]> {
    return this.http.get<Revenu[]>("http://localhost:8080/revenus")
  }
  
  getRevenuById(id: number): Observable<Revenu> {
    return this.http.get<Revenu>(`${this.baseUrl}/getRevenus/${id}`)
  }

  
}
