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
  searchedKeyword!:string;

  constructor(private elementRef: ElementRef,private utilisateurService:UtilisateurService,private dialog: MatDialog) { }
  utilisateurs: Utilisateur[];
  itemsPerPageOptions: number[] = [5, 10, 20]; // Options for items per page
  selectedItemsPerPage: number = 5; // Default selected items per page
  currentPage: number = 1; // Initial current page number
  ngOnInit(): void {
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.getAllUsers()

   
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
  getAllUsers()
  {
    this.utilisateurService.findAll().subscribe(data => {
      console.log('res ' , data)
      this.utilisateurs = data;
    } , error => {
      console.error(error)
    });
  }
 
  openModal(): void {
    const dialogRef = this.dialog.open(UtilisateurFormComponent, {
      width: '500px',
      data: { form:this.form }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers()
    });
  }
  modifierUtilisateur(utilisateur: Utilisateur): void {
    console.log('Modification de l\'utilisateur :', utilisateur);
    this.utilisateurService.modifierUtilisateur(utilisateur).subscribe(res => {
    }, error => {
      console.error(error);
    });
  }

  test(): void {
    console.log('Modification de l\'utilisateur :');
  }

  supprimerUtilisateur(utilisateur: Utilisateur): void {
    console.log('Suppression de l\'utilisateur :', utilisateur);
    this.utilisateurService.supprimerUtilisateur(utilisateur).subscribe(res => {
    }, error => {
      console.error(error);
    });
  }
  onItemsPerPageChange(): void {
    this.currentPage = 1; // Reset to the first page when items per page changes
 }
 
 onPageChange(page: number): void {
    this.currentPage = page;
 }
 getDisplayingFrom(): number {
  if (this.utilisateurs.length === 0) {
    return 0;
  }
  return (this.currentPage - 1) * this.selectedItemsPerPage + 1;
}

getDisplayingTo(): number {
  const lastItemIndex = this.currentPage * this.selectedItemsPerPage;
  return Math.min(lastItemIndex, this.utilisateurs.length);
}
}
  
