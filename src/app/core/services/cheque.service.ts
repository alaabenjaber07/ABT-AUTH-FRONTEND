import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cheque {
  chequeNumber: string;
  amount: number;
  beneficiary: string;
  dueDate: string;
  issueDate: string;
  status: 'EN_COURS' | 'ACCEPTE' | 'REJETE';  // Ajoutez les statuts possibles de l'enum
}


@Injectable({
  providedIn: 'root',
})
export class ChequeService {
  private apiUrl = 'http://localhost:8081/api/cheques';
    private baseUrl = 'http://localhost:8081/api/cheques';

  constructor(private http: HttpClient) {}

  // 🔒 Ajout du token dans le header
private getHeaders(): HttpHeaders {
  const currentUserString = localStorage.getItem('currentUser');
  let token = '';

  if (currentUserString) {
    try {
      const currentUser = JSON.parse(currentUserString);
      token = currentUser.token || '';
    } catch (e) {
      console.error('Erreur de parsing localStorage currentUser', e);
    }
  }

  console.log('Token JWT envoyé:', token);

  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
}



  // 📥 Récupérer tous les chèques
  //getAll(): Observable<Cheque[]> {
    //return this.http.get<Cheque[]>(this.apiUrl, { headers: this.getHeaders() });
  //}

// ➕ Ajouter un nouveau chèque
create(cheque: Cheque): Observable<Cheque> {
  return this.http.post<Cheque>(`${this.apiUrl}/create`, cheque, {
    headers: this.getHeaders()
  });
}


  // ❌ Supprimer un chèque
  delete(chequeNumber: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${chequeNumber}`);
}



  getAll() {
  return this.http.get<Cheque[]>('http://localhost:8081/api/cheques');
}

updateStatus(chequeNumber: string, status: string): Observable<any> {
  // Supposons que ton backend accepte une requête PUT ou POST pour mettre à jour le statut
  return this.http.put(`${this.baseUrl}/update-status/${chequeNumber}`, { status });
}

encashCheque(chequeNumber: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/encash/${chequeNumber}`, {});
}

rejectCheque(chequeNumber: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/reject/${chequeNumber}`, {});
}



}
