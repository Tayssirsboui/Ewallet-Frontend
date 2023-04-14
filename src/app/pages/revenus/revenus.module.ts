import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenusRoutingModule } from './revenus-routing.module';
import { RevenusComponent } from './revenus.component';


@NgModule({
  declarations: [
    RevenusComponent
  ],
  imports: [
    CommonModule,
    RevenusRoutingModule
  ]
})
export class RevenusModule { }
