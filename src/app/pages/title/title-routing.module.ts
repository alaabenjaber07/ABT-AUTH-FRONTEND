import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTitleComponent } from './add-title/add-title.component';
import { TitleListComponent } from './title-list/title-list.component';

const routes: Routes = [
    {
    path: '', // Default route for /pages
    redirectTo: 'starter', // Redirect to /pages/starter
    pathMatch: 'full'
  },
    {
        path: 'title-list',
        component: TitleListComponent
    },

    {
        path: 'add-title',
        component: AddTitleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TitleRoutingModule { }
