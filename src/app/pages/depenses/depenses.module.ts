import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepensesRoutingModule } from './depenses-routing.module';
import { DepensesComponent } from './depenses.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ChartsComponent } from './charts/charts.component';
import { PaiementprevusComponent } from './paiementprevus/paiementprevus.component';
import { FullCalendarComponent } from '@fullcalendar/angular';

import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule } from '@angular/platform-browser';

import { MyDialogComponentComponent } from './my-dialog-component/my-dialog-component.component';





@NgModule({
  declarations: [
    DepensesComponent,
    CalendrierComponent,
    ChartsComponent,
    PaiementprevusComponent,
  
    MyDialogComponentComponent,
    
   
   
  ],
  imports: [
    CommonModule,
    DepensesRoutingModule,
    FullCalendarModule

  ]
})
export class DepensesModule { }
