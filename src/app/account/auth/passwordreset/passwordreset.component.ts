import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { UserProfileService } from '../../../core/services/user.service';
@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  pwForm: FormGroup;
  hide = true;
  key: string;
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserProfileService) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.pwForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: ['', Validators.required]
    });
    this.key = this.route.snapshot.queryParamMap.get('key') || '';
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;
    this.userService.resetPassword(this.f.email.value).subscribe({ next: (res) => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Réinitialisation de mot de passe',
              text: 'Un email de réinitialisation a été envoyé à votre adresse e-mail si elle est associée à un compte.',
              showConfirmButton: false,
              timer: 4000
            });
        this.error = '';    
        this.loading = false;
        this.router.navigate(['/account/login']);
      },
      error: (error) => {
        Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Réinitialisation de mot de passe',
              text: 'Un email de réinitialisation a été envoyé à votre adresse e-mail si elle est associée à un compte.',
              showConfirmButton: false,
              timer: 4000
            });
        this.loading = false;
        this.router.navigate(['/account/login']);
      }
    });

    
  }
  showForm() {
    if (this.success !=='') {
      this.hide=false;
    }
  }
}
