import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    InvoicesRoutingModule,
    NgbNavModule,
    NgbPaginationModule,
    UIModule,
    Ng2SearchPipeModule, // Add for filter pipe
    NgbTooltipModule
  ]
})
export class InvoicesModule { }
