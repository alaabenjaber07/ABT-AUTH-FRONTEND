import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { EffetDTO } from 'src/app/core/models/EffetDTO';
import { EffetService } from '../../../core/services/effet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-effets',
  templateUrl: './list-effets.component.html',
  styleUrls: ['./list-effets.component.scss'],
  
})
export class ListEffetsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  loading: boolean = false;
  errorMessage: string | null = null;
  selectedEffets: number[] = [];
  selectedFile: File | null = null;

  etatOptions = [
  { label: 'Mettre a jour les etats', value: '' },
  { label: 'En attente', value: 'en_attente' },
  { label: 'Payé', value: 'paye' },
  { label: 'Rejeté', value: 'rejete' },
  { label: 'Impayé', value: 'impaye' },
  { label: 'Annulé', value: 'annule' },
  { label: 'Échu', value: 'echu' }
];
  selectedEtat: string = '';
  effetId: number = 1;
  effets :EffetDTO[] = [];
  constructor(private effetService : EffetService) { }

  ngOnInit(): void {
    this.loadEffets();
  }
  loadEffets(): void {
    this.loading = true;
    this.errorMessage = null;
    this.effetService.getAllEffets().subscribe({
      next: (data: EffetDTO[]) => {
        this.effets = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load effets';
        console.error('Error loading effets:', error);
        this.loading = false;
      }
    });
  }
  deleteEffet(id: number): void {
    this.effetService.deleteEffet(id).subscribe({
      next: () => {
        this.loadEffets();
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete effet';
        console.error('Error deleting effet:', error);
      }
    });
  }
  isSelected(id: number): boolean {
  return this.selectedEffets.includes(id);
}
toggleSelection(id: number, checked: boolean) {
  if (checked) {
    if (!this.selectedEffets.includes(id)) {
      this.selectedEffets.push(id);
    }
  } else {
    this.selectedEffets = this.selectedEffets.filter(item => item !== id);
  }
}

deleteSelected(): void {
  if (this.selectedEffets.length === 0) {
    Swal.fire('Aucun effet sélectionné', '', 'info');
    return;
  }

  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: `Voulez-vous vraiment supprimer ${this.selectedEffets.length} effet(s) sélectionné(s) ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: 'rgba(162, 162, 162, 1)',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.effetService.deleteMultiple(this.selectedEffets).subscribe({
        next: () => {
          this.loadEffets();
          this.selectedEffets = [];
        },
        error: (error) => {
          console.error('Error deleting effets:', error.message);
          Swal.fire('Erreur !', 'Erreur lors de la suppression des effets.', 'error');
        }
      });
    }
  });
}

updateEtatForSelected(newEtat: string): void {
  if (this.selectedEffets.length === 0) {
    Swal.fire('Aucun effet sélectionné', '', 'info');
    return;
  }

  Swal.fire({
    title: 'Confirmer la mise à jour',
    text: `Voulez-vous vraiment changer l'état de ${this.selectedEffets.length} effet(s) en "${newEtat}" ?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: 'rgba(162, 162, 162, 1)',
    confirmButtonText: 'Oui, mettre à jour !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      let completed = 0;
      this.selectedEffets.forEach(id => {
        this.effetService.updateEtat(id, newEtat).subscribe({
          next: () => {
            completed++;
            if (completed === this.selectedEffets.length) {
              this.loadEffets();
            }
          },
          error: (error) => {
            console.error(`Error updating effet ${id}:`, error.message);
          }
        });
      });
    }
  });
}
  triggerFileInput() {
    this.fileInput.nativeElement.click(); // ouvre le file picker
  }
onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile){
      this.importXml(this.selectedFile);
    }
  }
importXml(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const xmlContent = reader.result as string;
      console.log('Contenu XML:', typeof xmlContent === 'string' ? xmlContent : 'Contenu non valide');
      this.effetService.importXml(xmlContent).subscribe({
        next: () => alert('Import réussi !'), 

        error: (err) => alert('Erreur lors de l\'import : ' + err.message)
      });
    };
    reader.readAsText(file);
  }
 exportXml(id: number) {
  this.effetService.exportXml(id).subscribe({
    next: (xmlContent: string) => {
      // correspond à une masse de données sous forme binaire qui ne se conforme pas nécessairement à un format de fichier
      const blob = new Blob([xmlContent], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);

      // Créer un lien invisible pour déclencher le téléchargement
      const a = document.createElement('a');
      a.href = url;
      a.download = `effet_${id}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Libérer l'URL
      window.URL.revokeObjectURL(url);
    },
    error: (error) => {
      this.errorMessage = 'Erreur lors de l\'export XML';
      console.error('Error exporting XML:', error);
    }
  });
}

}
  






