import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Virement } from 'src/app/core/models/virement.model';
import { VirementService } from 'src/app/core/services/virement.service';
@Component({
  selector: 'app-edit-virement',
  templateUrl: './edit-virement.component.html',
  styleUrls: ['./edit-virement.component.scss']
})
export class EditVirementComponent implements OnInit {
  virementForm!: FormGroup;
  message: string = '';
  id!: number;

    // Listes déroulantes
  instructionsList = ['URGENT', 'STANDARD', 'RETARDABLE'];
  modeVirementList = ['IMMEDIAT', 'DIFFERE', 'PERMANENT'];
  statusList = ['EN_ATTENTE', 'TRAITE', 'REJETE'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private virementService: VirementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();

    this.virementService.getVirementById(this.id).subscribe({
      next: (virement) => {
        this.virementForm.patchValue(virement);

        // Désactiver tous les champs sauf instructions et status
        Object.keys(this.virementForm.controls).forEach(key => {
          if (key !== 'instructions' && key !== 'status') {
            this.virementForm.controls[key].disable();
          }
        });
      },
      error: (err) => {
        this.message = "Erreur lors du chargement du virement.";
        console.error(err);
      }
    });
  }

  initForm() {
    this.virementForm = this.fb.group({
      guichet: ['', Validators.required],
      dateVirement: ['', Validators.required],
      nomDonneur: ['', Validators.required],
      compteSource: ['', Validators.required],
      montant: ['', Validators.required],
      beneficiaireNom: ['', Validators.required],
      beneficiaireAdresse: ['', Validators.required],
      compteDestination: ['', Validators.required],
      instructions: ['', Validators.required],
      modeVirement: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.virementForm.invalid) return;

    // getRawValue pour récupérer les valeurs même des champs désactivés
    const updatedVirement: Virement = { id: this.id, ...this.virementForm.getRawValue() };

    this.virementService.updateVirement(this.id, updatedVirement).subscribe({
      next: () => {
        this.message = '✅ Virement mis à jour avec succès';
        setTimeout(() => this.router.navigate(['/virements/historique']), 1500);
      },
      error: (err) => {
        this.message = '❌ Erreur lors de la mise à jour';
        console.error(err);
      }
    });
  }

}