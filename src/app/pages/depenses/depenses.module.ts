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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyDialogComponentComponent } from './my-dialog-component/my-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './calendrier/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DepensesComponent,
    CalendrierComponent,
    ChartsComponent,
    PaiementprevusComponent,
    MyDialogComponentComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    DepensesRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    MatDialogModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule



  ],
  exports: [MatDialogModule],
  entryComponents: [CalendrierComponent]


})
export class DepensesModule { }