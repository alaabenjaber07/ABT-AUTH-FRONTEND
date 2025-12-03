import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const publicUrls = [
    '/api/user-profiles/forgot-password',
    '/api/user-profiles/reset-password'
  ];
  console.log(request.url);
  const isPublic = publicUrls.some(url => request.url.includes(url));

  if (!isPublic) { // seulement ajouter le token si ce n'est pas public
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']); // redirection
      }
      return throwError(() => error);
    })
  );
}

}
