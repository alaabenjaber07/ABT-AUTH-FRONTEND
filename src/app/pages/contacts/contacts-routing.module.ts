import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlistComponent } from './userlist/userlist.component';
import { UsergridComponent } from './usergrid/usergrid.component';
import { ProfileComponent } from './profile/profile.component';
import { RoleComponent } from './role/role.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    {
        path: 'list',
        component: UserlistComponent
    },
    {
        path: 'grid',
        component: UsergridComponent
    },
     { path: 'profile/:id', component: ProfileComponent },
     { path: 'role', component: RoleComponent },
    {
    path: 'edit-user/:id',
    component: EditUserComponent
     },

    {  
    path: 'profile', component: ProfileComponent 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }
