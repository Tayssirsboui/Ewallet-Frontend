import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { TypesCategoriesComponent } from './types-categories/types-categories.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { FormsModule } from '@angular/forms';


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
    
  ]
})
export class CategoriesModule { }
