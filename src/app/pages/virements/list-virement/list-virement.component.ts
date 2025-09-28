import { Component, OnInit } from '@angular/core';
import { Virement } from 'src/app/core/models/virement.model';
import { VirementService } from 'src/app/core/services/virement.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-virement',
  templateUrl: './list-virement.component.html',
  styleUrls: ['./list-virement.component.scss']
})
export class ListVirementComponent implements OnInit {
virements: Virement[] = [];
  filteredVirements: Virement[] = [];

  searchTerm: string = '';
  filterDate: string = '';

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pagesArray: number[] = [];

  constructor(
    private virementService: VirementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVirements();
  }

  loadVirements() {
    this.virementService.getAllVirements().subscribe(data => {
      this.virements = data;
      this.applyFiltersAndPagination();
    }, error => {
      console.error('Erreur lors du chargement des virements', error);
    });
  }

  filterVirements() {
    this.page = 1;
    this.applyFiltersAndPagination();
  }

  
  resetFiltersWithDelay() {
  setTimeout(() => {
    this.searchTerm = '';
    this.filterDate = '';
    this.page = 1;
    this.applyFiltersAndPagination();
  }, 200); 
}

  applyFiltersAndPagination() {
    let filtered = this.virements;

    // Filtrer par nom donneur (insensible casse)
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      filtered = filtered.filter(v =>
        v.nomDonneur?.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }

    // Filtrer par date (format attendu : 'yyyy-MM-dd')
    if (this.filterDate && this.filterDate.trim() !== '') {
      filtered = filtered.filter(v => {
        // Convertir la date v.dateVirement en 'yyyy-MM-dd' string
        const dateStr = new Date(v.dateVirement).toISOString().slice(0, 10);
        return dateStr === this.filterDate;
      });
    }

    // Pagination
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.pagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);

    const startIndex = (this.page - 1) * this.pageSize;
    this.filteredVirements = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.applyFiltersAndPagination();
  }

  deleteVirement(id: number): void {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Voulez-vous vraiment supprimer ce virement ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: 'rgba(162, 162, 162, 1)',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.virementService.deleteVirement(id).subscribe({
        next: () => {
          this.virements = this.virements.filter(v => v.id !== id);
          this.applyFiltersAndPagination();
          Swal.fire('Supprimé !', 'Le virement a été supprimé.', 'success');
        },
        error: (error) => {
          Swal.fire('Erreur', 'Erreur lors de la suppression : ' + (error.message || error), 'error');
        }
      });
    }
  });
}


  viewDetails(id: number): void {
    this.router.navigate(['/virements/details', id]);
  }
}

