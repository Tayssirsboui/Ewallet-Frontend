import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepensesComponent } from './depenses.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ChartsComponent } from './charts/charts.component';
import { PaiementprevusComponent } from './paiementprevus/paiementprevus.component';

import { MyDialogComponentComponent } from './my-dialog-component/my-dialog-component.component';





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
    {
      path: 'Paiementprevus',
      component: PaiementprevusComponent,
    },
    {
      path: 'mydialoguecomponent',
      component:MyDialogComponentComponent,
    },
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})

export class DepensesRoutingModule { }
