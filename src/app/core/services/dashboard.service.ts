import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http:HttpClient) { }
  private apiUrl='http://localhost:8081/api/dashboard';
  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user-count`);
  }
  getEffetCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/effets-count`);
  }
  getEffetByUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/effets/by-user`);
  }
  getEffetByEtat(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/effets/by-etat`);
  }
  getEffetRecent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/effets-recent`);
  }
  getEffetByType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/effets/by-type`);
  }
  getPercentage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/percentage`);
  }
  getChequeByStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cheques/by-status`);
  }
    getChequeCount(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/cheques-count`);
    }
    getChequeByUser(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/cheques/by-user`);
    }
    getVirementsByUser(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/virements/by-user`);
    }
}