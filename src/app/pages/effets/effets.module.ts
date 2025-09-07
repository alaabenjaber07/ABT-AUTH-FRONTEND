import { EffetsRoutingModule } from './effets-routing.module';
import { NgModule } from '@angular/core';
import { ListEffetsComponent } from './list-effets/list-effets.component';
import { AddEffetComponent } from './add-effet/add-effet.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- importer FormsModule ici
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms'; // <-- importer ReactiveFormsModule ici
@NgModule({
 declarations: [ListEffetsComponent,AddEffetComponent],
  imports: [
    CommonModule,
    EffetsRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
})
export class EffetsModule { }