import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})

/**
 * Form wizard component
 */
export class WizardComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;




 registerForm!: FormGroup;
   message = '';
 
   constructor(private fb: FormBuilder, private userProfileService: UserProfileService) {}
 
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
       phoneNumber: ['']
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
         this.message = 'Utilisateur créé avec succès !';
         this.registerForm.reset();
       },
       error: (err) => {
         this.message = 'Erreur lors de la création : ' + (err.error || err.message);
       }
     });
   }

}
