import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenusComponent } from './revenus.component';
import { CalendrierrevenuComponent } from './calendrierrevenu/calendrierrevenu.component';
import { ChartsrevenuComponent } from './chartsrevenu/chartsrevenu.component';

const routes: Routes = [{ path: 'revenus', component: RevenusComponent,
children:[
  {
    path: 'calendrierrevenu',
    component:CalendrierrevenuComponent,
  },
  {
    path: 'chartsrevenu',
    component: ChartsrevenuComponent,
  },
  

] }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenusRoutingModule { }
