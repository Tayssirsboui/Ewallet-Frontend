import { Component, OnInit } from '@angular/core';
import { UtilisateurFormComponent } from './utilisateur-form/utilisateur-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  openModal() {
    const dialogRef = this.dialog.open(UtilisateurFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {
  }

}
