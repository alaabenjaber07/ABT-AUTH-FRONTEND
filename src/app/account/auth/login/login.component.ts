import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { UserProfileService } from 'src/app/core/services/user.service';
import { KeycloakService } from 'src/app/core/services/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  passwordVisible: boolean = false;
  year: number = new Date().getFullYear();



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService,
    private keycloakService: KeycloakService,
    private authFackservice: AuthfakeauthenticationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Par défaut rediriger vers /dashboard si pas de returnUrl dans l'URL
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    if (environment.defaultauth === 'firebase') {
      // Auth Firebase
      this.authenticationService.login(credentials.email, credentials.password)
        .then(() => {
          console.log('Firebase login successful, navigation vers /dashboard');
          this.router.navigateByUrl('/dashboard');
        })
        .catch(error => {
          this.error = error ? error : '';
        });

    } else if (environment.defaultauth === 'keycloak') {
      // Auth Keycloak
      this.keycloakService.loginWithCredentials(credentials).subscribe({
        next: (res) => {
          console.log('Token reçu:', res.access_token);
          localStorage.setItem('token', res.access_token);
          console.log('Token stocké, navigation vers:', this.returnUrl);
          this.router.navigateByUrl(this.returnUrl)
            .then(success => {
              if (!success) {
                console.error('Navigation vers', this.returnUrl, 'échouée');
              }
            });
        },
        error: (err) => {
          this.error = 'Invalid login credentials';
          console.error(err);
        }
      });

    } else {
      // Auth factice
      this.authFackservice.login(credentials.email, credentials.password)
        .pipe(first())
        .subscribe(
          () => {
            console.log('Fake login réussi, navigation vers /dashboard');
            this.router.navigateByUrl('/dashboard');
          },
          error => {
            this.error = error ? error : '';
          });
    }
  }


  getPasswordInputType(): string {
    return this.passwordVisible ? 'text' : 'password';
  } 
  
}
