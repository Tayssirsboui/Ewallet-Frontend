import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepensesRoutingModule } from './depenses-routing.module';
import { DepensesComponent } from './depenses.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ChartsComponent } from './charts/charts.component';
import { PaiementprevusComponent } from './paiementprevus/paiementprevus.component';



@NgModule({
  declarations: [
    DepensesComponent,
    CalendrierComponent,
    ChartsComponent,
    PaiementprevusComponent,
    
   
  ],
  imports: [
    CommonModule,
    DepensesRoutingModule

  ]
})
export class DepensesModule { }
