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

 

  saveRevenu(): Observable<Revenu[]> {
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

}