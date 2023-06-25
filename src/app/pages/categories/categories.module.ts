import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { TypesCategoriesComponent } from './types-categories/types-categories.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    CategoriesComponent,
    TypesCategoriesComponent,
    CategorieFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    CategoriesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [CategorieFormComponent,TypesCategoriesComponent],
  exports: [
    TypesCategoriesComponent
  ]
})
export class CategoriesModule { }
