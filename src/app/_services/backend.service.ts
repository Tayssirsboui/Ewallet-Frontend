import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  postFormData(formData: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/api/depenses';

  constructor(private http: HttpClient) { }

  createEvent(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData);
  }

  getData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/${id}`);
  }

  updateData(id: number, formData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/data/${id}`, formData);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/data/${id}`);
  }
}