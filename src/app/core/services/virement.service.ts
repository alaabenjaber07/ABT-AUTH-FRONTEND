import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Virement } from '../models/virement.model';

@Injectable({
  providedIn: 'root',
})
export class VirementService {
  private apiUrl = 'http://localhost:8081/api/virements';

  constructor(private http: HttpClient) {}

  addVirement(virement: Virement): Observable<Virement> {
    return this.http.post<Virement>(`${this.apiUrl}/create`, virement);
  }

   getAllVirements(): Observable<Virement[]> {
    return this.http.get<Virement[]>(`${this.apiUrl}/all`);
  }

deleteVirement(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
}

  updateVirement(id: number, virement: Virement): Observable<Virement> {
  return this.http.put<Virement>(`${this.apiUrl}/${id}`, virement);
}

getVirementById(id: number): Observable<Virement> {
  return this.http.get<Virement>(`${this.apiUrl}/${id}`);
}


getNombreTotal(): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/nombre-total`);
}

getDashboard(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/dashboard`);
}

getHistorique(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/historique`);
}

getNombreParInstruction(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/nombre-par-instruction`);
}



}