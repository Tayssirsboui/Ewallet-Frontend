import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { ListGroupComponent } from './list-group/list-group.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ListGroupComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    RouterModule.forChild([
      { path: '', component: ListGroupComponent },
      
    ])
  ]
})
export class CategoriesModule { }
