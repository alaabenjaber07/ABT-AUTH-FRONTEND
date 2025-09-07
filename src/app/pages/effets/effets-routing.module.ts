import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEffetsComponent } from './list-effets/list-effets.component';
import { AddEffetComponent } from './add-effet/add-effet.component';

const routes: Routes = [
    {
        path: 'list-effets',
        component: ListEffetsComponent
    },
    {
        path: 'add-effet',
        component: AddEffetComponent
    }

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EffetsRoutingModule { }