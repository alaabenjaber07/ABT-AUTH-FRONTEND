import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirementRoutingModule } from './virement-routing.module';
import { AddVirementComponent } from './add-virement/add-virement.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListVirementComponent } from './list-virement/list-virement.component';
import { VirementDetailsComponent } from './virement-details/virement-details.component';
import { EditVirementComponent } from './edit-virement/edit-virement.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [AddVirementComponent, ListVirementComponent, VirementDetailsComponent, EditVirementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VirementRoutingModule,
     UIModule,
     FormsModule ,
     NgbModule,
      NgSelectModule
  ]
})
export class VirementModule { }