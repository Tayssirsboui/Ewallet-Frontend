import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateursComponent } from './utilisateurs.component';
import { TableUtilisateursComponent } from './table-utilisateurs/table-utilisateurs.component';
import { UtilisateurFormComponent } from './utilisateur-form/utilisateur-form.component';

const routes: Routes = [{ path: 'utilisateurs', component: UtilisateursComponent, 
children: [
  {path:'table-utilisateurs',
  component: TableUtilisateursComponent},
  {path:'utilisateur-form',
component:UtilisateurFormComponent}
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursRoutingModule { }
