import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EffetDTO } from '../models/EffetDTO';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class EffetService {
    private apiUrl='http://localhost:8081/api/effets';
    constructor(private http: HttpClient) { }
    addEffet(effet: EffetDTO): Observable<String> {
        return this.http.post(`${this.apiUrl}/create`, effet, { responseType: 'text' });
    }
    getAllEffets(): Observable<EffetDTO[]> {
        return this.http.get<EffetDTO[]>(this.apiUrl);
    }
    getEffetById(idEffet: number): Observable<EffetDTO> {
        return this.http.get<EffetDTO>(`${this.apiUrl}/${idEffet}`);
    }
    deleteEffet(idEffet: number): Observable<String> {
        return this.http.delete(`${this.apiUrl}/${idEffet}`, { responseType: 'text' });
    }
    updateEtat(id: number, newEtat: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/etat`, { etat: newEtat });
  }
  deleteMultiple(ids: number[]): Observable<String> {
    return this.http.post(`${this.apiUrl}/delete-multiple`, ids , { responseType: 'text' });
  }
  importXml(xml: String): Observable<any> {
    return this.http.post(`${this.apiUrl}/import`, xml,{ headers: { 'Content-Type': 'application/xml' },responseType: 'text'});
  }
    exportXml(idEffet:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idEffet}/export`, { responseType: 'text' });
    }




}