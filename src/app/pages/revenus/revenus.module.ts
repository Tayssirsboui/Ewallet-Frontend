import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenusRoutingModule } from './revenus-routing.module';
import { RevenusComponent } from './revenus.component';
import { CalendrierrevenuComponent } from './calendrierrevenu/calendrierrevenu.component';
import { ChartsrevenuComponent } from './chartsrevenu/chartsrevenu.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    RevenusComponent,
    CalendrierrevenuComponent,
    ChartsrevenuComponent
  ],
  imports: [
    CommonModule,
    RevenusRoutingModule,
    FullCalendarModule
  ]
})
export class RevenusModule { }
