import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';
import { UserProfileDTO } from '../models/UserProfileDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    private apiUrl = 'http://localhost:8089/api/user-profiles'; 

     addUser(user: UserProfileDTO): Observable<any> {
          console.log("Sending user to backend", user);
    return this.http.post(`${this.apiUrl}/register`, user);
  }


    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

   getAllUsers(): Observable<UserProfileDTO[]> {
    return this.http.get<UserProfileDTO[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  getUserById(idUserprofile: number): Observable<UserProfileDTO> {
    return this.http.get<UserProfileDTO>(`${this.apiUrl}/${idUserprofile}`);
  }
  
getUserByKeycloakId(keycloakId: string): Observable<UserProfileDTO> {
  return this.http.get<UserProfileDTO>(`${this.apiUrl}/by-keycloak/${keycloakId}`);
}

getProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${username}`);
  }

}
