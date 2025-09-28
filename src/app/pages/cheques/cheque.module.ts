import { NgModule } from '@angular/core';
import { AddChequesComponent } from './add-cheques/add-cheques.component';
import { ListChequesComponent } from './list-cheques/list-cheques.component';
import { ChequeRoutingModule } from './cheque-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [AddChequesComponent, ListChequesComponent],
    imports: [ChequeRoutingModule, CommonModule, FormsModule,ReactiveFormsModule, NgSelectModule],
}) 
export class ChequeModule { }