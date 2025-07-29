import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Usergrid } from './usergrid.model';

import { userGridData } from './data';
import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
import { UserProfileService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.scss']
})

/**
 * Contacts user grid component
 */
export class UsergridComponent implements OnInit {
  // bread crumb items
   breadCrumbItems: Array<{}>;
  
  
  
  
   registerForm!: FormGroup;
     message = '';
   
     constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private router: Router) {}
   
     ngOnInit(): void {
         this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Wizard', active: true }];
       this.registerForm = this.fb.group({
         username: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required],
         firstName: ['', Validators.required],
         lastName: ['', Validators.required],
         matricule: [''],
         address: [''],
         phoneNumber: [''],
         dateOfBirth: [''],
         role: ['bancaire']
       });
     }
   
  onSubmit() {
  if (this.registerForm.invalid) {
    this.message = "Veuillez remplir correctement tous les champs obligatoires.";
    return;
  }
  
  const user: UserProfileDTO = this.registerForm.value;
 this.userProfileService.addUser(user).subscribe({
  
  next: () => {
    console.log("Envoi de l'utilisateur au backend", user);
    this.message = 'Utilisateur créé avec succès !';
    this.registerForm.reset();
    this.router.navigate(['/list']);
  },
  error: (err) => {
    this.message = 'Erreur lors de la création : ' + (err.error || err.message || 'Erreur inconnue');
    // naviguer quand même même s’il y a une erreur
    this.router.navigate(['/contacts/list']);
  }
});


}
}
