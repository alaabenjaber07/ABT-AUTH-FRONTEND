import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EffetService } from 'src/app/core/services/effet.service';
@Component({
  selector: 'app-add-effet',
  templateUrl: './add-effet.component.html',
  styleUrls: ['./add-effet.component.scss']
})
export class AddEffetComponent implements OnInit {
  effetForm!: FormGroup;
  step = 1;
  typesEffet = [
  { label: 'Billet à ordre', value: 'BILLET_A_ORDRE' },
  { label: 'Lettre de change', value: 'LETTRE_DE_CHANGE' }
];
 selectedType!: string;
  constructor(private fb: FormBuilder,private effetService :EffetService,private router :Router) { }

  ngOnInit(): void {
    this.effetForm = this.fb.group({
      reference: ['', Validators.required],
      typeEffet: [null, Validators.required],
      tireur: ['', Validators.required],
      tire: ['', Validators.required],
      beneficiaire: [''],
      montant: ['', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d+)?$/)]
      ],
      dateEmission: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      ibanTireur: ['TN', [Validators.required,Validators.pattern(/^TN\d{24}$/)]],
      ibanTire: ['TN', [Validators.required,Validators.pattern(/^TN\d{24}$/)]]
    });
  }
  

onTypeEffetChange(selected: any) {
  this.selectedType = selected; 
  if (this.selectedType === 'BILLET_A_ORDRE') {
    this.effetForm.get('tire')?.setValue('');
    this.effetForm.get('tire')?.clearValidators();
  } else {
    this.effetForm.get('tire')?.setValidators(Validators.required);
  }
  this.effetForm.get('tire')?.updateValueAndValidity();
}

nextStep() {
  if (this.effetForm.get('typeEffet')?.valid) {
    this.selectedType = this.effetForm.get('typeEffet')?.value;

    // Ajuster les validations selon le type
    if (this.selectedType === 'BILLET_A_ORDRE') {
      this.effetForm.get('tire')?.setValue('');
      this.effetForm.get('tire')?.clearValidators();
    } else {
      this.effetForm.get('tire')?.setValidators(Validators.required);
    }
    this.effetForm.get('tire')?.updateValueAndValidity();

    this.step++;
  } else {
    this.effetForm.get('typeEffet')?.markAsTouched();
  }
}

prevStep() {
  this.step = 1;
}



  onSubmit(): void {
    if (this.effetForm.valid) {
      
      this.effetService.addEffet(this.effetForm.value).subscribe({
        
        next: () => {
          this.effetForm.reset();
          this.router.navigate(['effets/list-effets']);
        },
        error: (error) => {
          console.error('Error adding effet:', JSON.stringify(error));
          
        }
      });
    } else {
      this.effetForm.markAllAsTouched(); 
    }
  }

}
