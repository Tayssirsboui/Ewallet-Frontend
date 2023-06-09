import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenusRoutingModule } from './revenus-routing.module';
import { RevenusComponent } from './revenus.component';
import { CalendrierrevenuComponent } from './calendrierrevenu/calendrierrevenu.component';
import { ChartsrevenuComponent } from './chartsrevenu/chartsrevenu.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalComponent } from './calendrierrevenu/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RevenusComponent,
    CalendrierrevenuComponent,
    ChartsrevenuComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    RevenusRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule

    // NgModule,
  ]
})
export class RevenusModule { }
