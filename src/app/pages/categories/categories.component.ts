import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  openModal() {
    const dialogRef = this.dialog.open(CategorieFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {
  }

}
