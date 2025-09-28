import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotDePasseComponent } from './mot-de-passe/mot-de-passe.component';

const routes: Routes = [
  { path: '', redirectTo: 'mot-de-passe', pathMatch: 'full' },
  { path: 'mot-de-passe', component: MotDePasseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }