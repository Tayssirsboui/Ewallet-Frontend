import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaiementprevusFormComponent } from './paiementprevus-form/paiementprevus-form.component';

@Component({
  selector: 'app-depenses',
  
   templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  openModal() {
    const dialogRef = this.dialog.open(PaiementprevusFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  ngOnInit(): void {
  }

}
