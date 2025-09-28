import {Route, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListChequesComponent } from './list-cheques/list-cheques.component';
import { AddChequesComponent } from './add-cheques/add-cheques.component';
const routes: Routes = [
    { path: 'list-cheques', component: ListChequesComponent },
    {path: 'add-cheque', component: AddChequesComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChequeRoutingModule { }