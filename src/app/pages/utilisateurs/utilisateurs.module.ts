import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { UtilisateursComponent } from './utilisateurs.component';
import { TableUtilisateursComponent } from './table-utilisateurs/table-utilisateurs.component';
import { UtilisateurFormComponent } from './utilisateur-form/utilisateur-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    UtilisateursComponent,
    TableUtilisateursComponent,
    UtilisateurFormComponent
  ],
  imports: [
    CommonModule,
    UtilisateursRoutingModule,
    FormsModule,
   
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [UtilisateurFormComponent,TableUtilisateursComponent],
  exports: [
    TableUtilisateursComponent
  ]
  
})
export class UtilisateursModule { }
