import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendrierrevenuComponent } from './calendrierrevenu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CalendrierrevenuComponent],
  imports: [CommonModule,NgbModule],

  exports: [CalendrierrevenuComponent],
})
export class CalendrierrevenuModule {}