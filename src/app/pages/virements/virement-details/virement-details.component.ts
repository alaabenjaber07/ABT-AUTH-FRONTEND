import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Virement } from 'src/app/core/models/virement.model';
import { ActivatedRoute } from '@angular/router';
import { VirementService } from 'src/app/core/services/virement.service';

@Component({
  selector: 'app-virement-details',
  templateUrl: './virement-details.component.html',
  styleUrls: ['./virement-details.component.scss']
})
export class VirementDetailsComponent implements OnInit {
virement?: Virement;  // optionnel au départ
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private virementService: VirementService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.virementService.getVirementById(this.id).subscribe({
      next: (data) => this.virement = data,
      error: (err) => {
        console.error("Virement non trouvé", err);
        this.virement = undefined; // explicitement
      }
    });
  }

  exportToPDF() {
    const data = document.getElementById('virement-details');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.save(`virement_${this.id}.pdf`);
      });
    }
  }

}