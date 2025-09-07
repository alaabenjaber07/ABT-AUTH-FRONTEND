import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
// npm install jwt-decode --legacy-peer-deps npm install --save-dev @types/jwt-decode --legacy-peer-deps
import Keycloak from 'keycloak-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  public keycloak: Keycloak;

  // URL du serveur Keycloak pour le token
  private keycloakUrl = 'http://localhost:8080/realms/carthago-realm/protocol/openid-connect/token';
  private apiUrl = 'http://localhost:8081/api/user-profiles';
  constructor(private http: HttpClient) {
    
    this.keycloak = new Keycloak({
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

  
 loginWithCredentials(credentials: { username: string, password: string }): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post(`${this.apiUrl}/login`, credentials, { headers, responseType: 'text'  });
}



  logout(): void {
    localStorage.removeItem('token'); 
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  getToken(): string | undefined {
    return localStorage.getItem('token') || this.keycloak.token;

  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log("token" ,token);
    return token != null && !this.isTokenExpired(token);
  }

   getKeycloakInstance(): Keycloak {
    return this.keycloak;
  }

 loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }

  getUsername(): string {
    return this.keycloak.tokenParsed?.preferred_username ?? '';
  }

  
  getKeycloakId(): string | null {
  const tokenParsed = this.keycloak.tokenParsed;
  
  if (tokenParsed && typeof tokenParsed === 'object' && 'sub' in tokenParsed) {
    return tokenParsed.sub;
  }
  return null;
}

  
isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return false; 
    const now = Date.now() ;
    const date = new Date(now );
    const exp = decoded.exp * 1000;
    return exp < now;
  } catch (error) {
    return true;
  }
}


}