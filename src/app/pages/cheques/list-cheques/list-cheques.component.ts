import { Component, OnInit } from '@angular/core';
import {ChequeService, Cheque} from "../../../core/services/cheque.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-cheques',
  templateUrl: './list-cheques.component.html',
  styleUrls: ['./list-cheques.component.scss']
})
export class ListChequesComponent implements OnInit {
 cheques: Cheque[] = [];
  filteredCheques: Cheque[] = [];
  paginatedCheques: Cheque[] = [];
  selectedCheque: any = null;
  selectedEtat: string;
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  etatOptions = [
    { label: 'EN_COURS', value: 'EN_COURS' },
    { label: 'ACCEPTE', value: 'ACCEPTE' },
    { label: 'REJETE', value: 'REJETE' }
  ];
  constructor(private chequeService: ChequeService) {}

  ngOnInit(): void {
    this.loadCheques();
  }
  selectCheque(cheque: Cheque) {
  this.selectedCheque = cheque;
  this.selectedEtat = cheque.status; 
}
updateEtatForSelected(newStatus: string) {
  if (!this.selectedCheque) return;

  this.selectedCheque.status = newStatus;
  this.onStatusChange(this.selectedCheque);
}
  loadCheques() {
    this.chequeService.getAll().subscribe({
      next: (data) => {
        this.cheques = data;
        this.filteredCheques = [...this.cheques];
        this.applyPagination();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des chèques', err);
      }
    });
  }

  filterCheques() {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.filteredCheques = this.cheques.filter(chq =>
        chq.chequeNumber.toLowerCase().includes(term)
      );
    } else {
      this.filteredCheques = [...this.cheques];
    }
    this.currentPage = 1;
    this.applyPagination();
  }

  applyPagination() {
    this.totalPages = Math.ceil(this.filteredCheques.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCheques = this.filteredCheques.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyPagination();
  }
deleteSelectedCheque() {
  if (!this.selectedCheque) return;

  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Cette action est irréversible !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#4CAF50',   
    cancelButtonColor: 'rgba(162, 162, 162, 1)'     
  }).then((result) => {
    if (result.isConfirmed) {
      this.chequeService.delete(this.selectedCheque.chequeNumber).subscribe({
        next: () => {
          this.selectedCheque = null; // réinitialise la sélection
          this.loadCheques(); // recharge la liste
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          this.loadCheques(); // recharge la liste même en cas d'erreur
        }
      });
    }
  });
}


  onStatusChange(cheque: Cheque) {
    this.chequeService.updateStatus(cheque.chequeNumber, cheque.status).subscribe({
      next: (updatedCheque) => {
        this.updateChequeInList(updatedCheque);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
      }
    });
  }

  accepterCheque(chequeNumber: string) {
    this.chequeService.encashCheque(chequeNumber).subscribe({
      next: (updatedCheque) => {
        this.updateChequeInList(updatedCheque);
        this.loadCheques();
      },
      error: (err) => {
        this.loadCheques();
        console.error('Erreur lors de l\'acceptation', err);
      }
    });
  }

  rejeterCheque(chequeNumber: string) {
    this.chequeService.rejectCheque(chequeNumber).subscribe({
      next: (updatedCheque) => {
        this.updateChequeInList(updatedCheque);
      },
      error: (err) => {
        console.error('Erreur lors du rejet', err);
      }
    });
  }

  private updateChequeInList(updatedCheque: Cheque) {
    const index = this.cheques.findIndex(c => c.chequeNumber === updatedCheque.chequeNumber);
    if (index !== -1) {
      this.cheques[index] = updatedCheque;
      // Il faut aussi rafraîchir filteredCheques et paginatedCheques
      this.filterCheques();
    }
  }

  goToAddCheque() {
    window.location.href = '/cheques/add-cheque';
  }
  
 

}
