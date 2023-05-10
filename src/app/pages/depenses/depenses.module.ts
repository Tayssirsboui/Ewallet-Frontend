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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';
import { ModalComponent } from './calendrier/modal/modal.component';



@NgModule({
  declarations: [
    DepensesComponent,
    CalendrierComponent,
    ChartsComponent,
    PaiementprevusComponent,
    MyDialogComponentComponent,
    ModalComponent,
    
    
    
   
   
  ],
  imports: [
    CommonModule,
    DepensesRoutingModule,
    FullCalendarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule

  ]
})
export class DepensesModule { }
