import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepensesComponent } from './depenses.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ChartsComponent } from './charts/charts.component';



const routes: Routes = [{
  path: 'depenses',
  component: DepensesComponent,
  children: [
    {
      path: 'calendrier',
      component:CalendrierComponent,
    },
    {
      path: 'charts',
      component: ChartsComponent,
    },
    
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class DepensesRoutingModule { }
