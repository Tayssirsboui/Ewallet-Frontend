import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import { Utilisateur } from 'src/app/utilisateur';
import { UtilisateurFormComponent } from '../utilisateur-form/utilisateur-form.component';

@Component({
  selector: 'app-table-utilisateurs',
  templateUrl: './table-utilisateurs.component.html',
  styleUrls: ['./table-utilisateurs.component.css']
})
export class TableUtilisateursComponent implements OnInit {
  form: any = {
    nom: null,
    prenom: null,
    email: null
  };
  afficherFormulaire: boolean=false;

  constructor(private elementRef: ElementRef,private utilisateurService:UtilisateurService,private dialog: MatDialog) { }
  utilisateurs: Utilisateur[];

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);


    this.utilisateurService.findAll().subscribe(data => {
      console.log('res ' , data)
      this.utilisateurs = data;
    } , error => {
      console.error(error)
    });
  }
  // ajouterUtilisateur() {
  //   this.afficherFormulaire = true;
  // }
  // openModal() {
  //   this.afficherFormulaire = true;
  //   const dialogRef = this.dialog.open(UtilisateurFormComponent, {
  //     panelClass: 'app-modal',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  // }
  

  openModal(): void {
    const dialogRef = this.dialog.open(UtilisateurFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  modifierUtilisateur(utilisateur: Utilisateur): void {
    console.log('Modification de l\'utilisateur :', utilisateur);
    this.utilisateurService.modifierUtilisateur(utilisateur).subscribe(res => {
    }, error => {
      console.error(error);
    });
  }

  supprimerUtilisateur(utilisateur: Utilisateur): void {
    console.log('Suppression de l\'utilisateur :', utilisateur);
    this.utilisateurService.supprimerUtilisateur(utilisateur).subscribe(res => {
    }, error => {
      console.error(error);
    });
  }
}
  
