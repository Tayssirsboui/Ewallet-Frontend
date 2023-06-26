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
import { PaiementprevusFormComponent } from './paiementprevus-form/paiementprevus-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    DepensesComponent,
    CalendrierComponent,
    ChartsComponent,
    PaiementprevusComponent,
    MyDialogComponentComponent,
    ModalComponent,
    PaiementprevusFormComponent
  ],
  imports: [
    CommonModule,
    DepensesRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    MatDialogModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule, 
    NgxPaginationModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule


  ],
  exports: [MatDialogModule,PaiementprevusComponent],
  entryComponents: [CalendrierComponent,PaiementprevusComponent,PaiementprevusFormComponent]


})
export class DepensesModule { }