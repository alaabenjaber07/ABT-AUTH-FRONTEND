import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVirementComponent } from './add-virement/add-virement.component';
import { ListVirementComponent } from './list-virement/list-virement.component';
import { EditVirementComponent } from './edit-virement/edit-virement.component';
import { VirementDetailsComponent } from './virement-details/virement-details.component';

const routes: Routes = [
  { path: 'add', component: AddVirementComponent },
  { path: 'historique', component: ListVirementComponent },
  {path: 'edit/:id', component: EditVirementComponent},
  { path: 'details/:id', component: VirementDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirementRoutingModule { }