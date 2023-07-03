import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Depense } from '../models/depense.model';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  updateNotificationCount(msg: string): void {
    this.notificationSubject.next(msg);
  }
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

  deleteDepense(idDepense:Number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDepenses/${idDepense}`);
  }

  findLastDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseUrl}/getLastDepenses`);
  }

  getTotalDepenseAmount(idUtilisateur:number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalDepense/${idUtilisateur}`);
  }
  
  getPaiementsPrevus(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseUrl}/getPaiementsPrevus`);
  }

  chartDepenseRevenuData(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl +"/chartDepRevData");
  }
  notifPaiementPrevu(): Observable<[]> {
    return this.http.get<[]>(`${this.baseUrl}/notifPaiementPrevu`);
  }
  doPaiementPrevu(idDepense:Number): Observable<any> {
    return this.http.put(`${this.baseUrl}/doPaiementPrevu/${idDepense}`,null);
  }
}
