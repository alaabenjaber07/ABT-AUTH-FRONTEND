import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import Keycloak from 'keycloak-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  public keycloak: KeycloakInstance;

  // URL du serveur Keycloak pour le token
  private keycloakUrl = 'http://localhost:8080/realms/carthago-realm/protocol/openid-connect/token';
  private apiUrl = 'http://localhost:8081/api/user-profiles';
  constructor(private http: HttpClient) {
    
    this.keycloak = Keycloak({
      url: 'http://localhost:8080',
      realm: 'carthago-realm',
      clientId: 'carthago-client-angular'
    });
  }

  init(): Promise<boolean> {
    return this.keycloak
      .init({
        onLoad: 'check-sso', // N'oblige pas à ouvrir la page Keycloak au démarrage
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      })
      .then(authenticated => {
        console.log('[Keycloak] Authenticated:', authenticated);
        return authenticated;
      })
      .catch(err => {
        console.error('[Keycloak] Init failed:', err);
        return false;
      });
  }

  // Méthode pour l'authentification via email et mot de passe
  /*loginWithCredentials(credentials: { email: string, password: string }): Observable<any> {
    const body = new URLSearchParams();
    body.set('client_id', 'carthago-client-angular'); // Utilise ton client Keycloak
    body.set('username', credentials.email);  // Utilise l'email
    body.set('password', credentials.password);  // Utilise le mot de passe
    body.set('grant_type', 'password');  // Utilise le "password grant type"

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Appel à l'API Keycloak pour obtenir le token
    return this.http.post(this.keycloakUrl, body.toString(), { headers });
  }*/
 loginWithCredentials(credentials: { username: string, password: string }): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post(`${this.apiUrl}/login`, credentials, { headers, responseType: 'text'  });
}



  logout(): void {
    localStorage.removeItem('token'); 
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }

   getKeycloakInstance(): KeycloakInstance {
    return this.keycloak;
  }

 loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }

  getUsername(): string {
    return this.keycloak.tokenParsed?.preferred_username ?? '';
  }

  getKeycloakId(): string {
    return this.keycloak.tokenParsed?.sub ?? '';
  }



}