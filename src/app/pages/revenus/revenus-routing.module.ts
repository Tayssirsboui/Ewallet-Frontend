import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenusComponent } from './revenus.component';

const routes: Routes = [{ path: '', component: RevenusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenusRoutingModule { }
