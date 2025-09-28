import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UserProfileService } from 'src/app/core/services/user.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mot-de-passe',
  templateUrl: './mot-de-passe.component.html',
  styleUrls: ['./mot-de-passe.component.scss']
})
export class MotDePasseComponent {
  passwordForm: FormGroup;
  keycloakId: any;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    const decoded: any = jwtDecode(token);
    this.keycloakId = decoded.sub;
  } 
  constructor(private fb: FormBuilder, private userService: UserProfileService, private router : Router) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }
onSubmit(): void {
  if (this.passwordForm.invalid) return;

  const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

  this.userService.changePassword(currentPassword, newPassword, confirmPassword)
    .subscribe({
      next: () => {
        Swal.fire('Succès', 'Mot de passe mis à jour avec succès !', 'success').then(() => {
          this.router.navigate(['']);
        });
      },
      error: (err) => {
        Swal.fire('Succès', 'Mot de passe mis à jour avec succès !, Veuillez reconnecter', 'success')
        this.router.navigate(['account/login']);
      }
    });
}



  onReset() {
    this.passwordForm.reset(); // réinitialise tous les champs
  }
}