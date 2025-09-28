import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChequeService, Cheque } from '../../../core/services/cheque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cheques',
  templateUrl: './add-cheques.component.html',
  styleUrls: ['./add-cheques.component.scss']
})
export class AddChequesComponent implements OnInit {

 chequeForm: FormGroup;

   // ✅ Déclaration de la liste des statuts
  chequeStatusOptions: string[] = ['EN_COURS', 'ACCEPTE', 'REJETE'];

  constructor(private fb: FormBuilder, private chequeService: ChequeService,private router :Router) {}

 ngOnInit(): void {
  this.chequeForm = this.fb.group({
    chequeNumber: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0)]],
    issueDate: ['', Validators.required],
    dueDate: ['', Validators.required],
    beneficiary: ['', Validators.required],
    status: ['EN_COURS', Validators.required],
  });
}

onSubmit(): void {
  if (this.chequeForm.valid) {
    const formValue = this.chequeForm.value;

    // Fonction pour formater en yyyy-MM-dd
    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      const month = '' + (d.getMonth() + 1);
      const day = '' + d.getDate();
      const year = d.getFullYear();

      return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    };

    const chequeData = {
      ...formValue,
      amount: Number(formValue.amount),
      issueDate: formatDate(formValue.issueDate),
      dueDate: formatDate(formValue.dueDate),
    };

    this.chequeService.create(chequeData).subscribe(
      (response) => {
        this.chequeForm.reset();
        this.router.navigate(['/cheques/list-cheques']); 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du chèque', error);
        
      }
    );
  } else {
    errorMessage: 'Formulaire invalide. Veuillez vérifier les champs.';
  }
}



}
