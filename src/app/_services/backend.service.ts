import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from '../models/depense.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:8080/'; 

  constructor(private http:HttpClient ) {}
  
  getDepense(): Observable<Depense[]> {
    return this.http.get<Depense[]>("http://localhost:8080/getDepenses");
  }

  findLastDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>("http://localhost:8080/getLastDepenses");
    
  }
  getTotalDepenseAmount(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/totalDepense");
    
  }
}
