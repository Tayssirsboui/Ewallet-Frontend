import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { TypesCategoriesComponent } from './types-categories/types-categories.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';

const routes: Routes = [{ path: 'categories', component: CategoriesComponent ,
children: [
  {path:'types-categories',
  component: TypesCategoriesComponent},
  {path:'categorie-form',
  component : CategorieFormComponent}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
