import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateursComponent } from './utilisateurs.component';
import { TableUtilisateursComponent } from './table-utilisateurs/table-utilisateurs.component';

const routes: Routes = [{ path: 'utilisateurs', component: UtilisateursComponent, 
children: [
  {path:'types-categories',
  component: TableUtilisateursComponent},
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursRoutingModule { }
