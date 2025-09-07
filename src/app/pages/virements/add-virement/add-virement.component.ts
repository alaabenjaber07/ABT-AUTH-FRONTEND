import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VirementService } from 'src/app/core/services/virement.service';
@Component({
  selector: 'app-add-virement',
  templateUrl: './add-virement.component.html',
  styleUrls: ['./add-virement.component.scss']
})
export class AddVirementComponent implements OnInit {
 virementForm!: FormGroup;
  message = '';

  instructionsList = ['URGENT', 'STANDARD', 'RETARDABLE'];
  modeVirementList = ['IMMEDIAT', 'DIFFERE', 'PERMANENT'];
  statusList = ['EN_ATTENTE', 'TRAITE', 'REJETE'];


  constructor(
    private fb: FormBuilder,
    private virementService: VirementService,
    private router: Router 

  ) {}

  ngOnInit(): void {
    this.virementForm = this.fb.group({
      guichet: ['', Validators.required],
      dateVirement: ['', Validators.required],
      nomDonneur: ['', Validators.required],
      compteSource: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0.01)]],
      beneficiaireNom: ['', Validators.required],
      beneficiaireAdresse: ['', Validators.required],
      compteDestination: ['', Validators.required],
      instructions: ['', Validators.required],
      modeVirement: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

submitForm(): void {
  if (this.virementForm.invalid) {
    this.message = 'Veuillez remplir correctement tous les champs requis.';
    return;
  }

  const formValue = { ...this.virementForm.value };

  // Transformer la date au bon format yyyy-MM-dd
  if (formValue.dateVirement) {
    formValue.dateVirement = new Date(formValue.dateVirement).toISOString().split('T')[0];
  }

  this.virementService.addVirement(formValue).subscribe({
    next: (res) => {
      console.log(res);
      this.message = 'Virement ajouté avec succès. ID : ' + res.id;
      this.router.navigate(['/virement/historique']);
    },
    error: (err) => {
      this.message = 'Erreur lors de l\'ajout : ' + err.error;
      this.router.navigate(['/virement/historique']);
    }
  });
}



}
