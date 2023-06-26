import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Depense } from 'src/app/models/depense.model';
import { BackendService } from 'src/app/_services/backend.service';
import Swal from 'sweetalert2';
import { PaiementprevusFormComponent } from '../paiementprevus-form/paiementprevus-form.component';

@Component({
  selector: 'app-paiementprevus',
  templateUrl: './paiementprevus.component.html',
  styleUrls: ['./paiementprevus.component.css']
})
export class PaiementprevusComponent implements OnInit {

  form: any = {
    description: null, dateprevue: null, montant: null,
    idDepense: null, statut:null
  };
  afficherFormulaire: boolean=false;
  searchedKeyword!:string;
  idDepense:number;

  constructor(private elementRef: ElementRef,private backendService:BackendService,private dialog: MatDialog) { }
  depenses: Depense[];
  itemsPerPageOptions: number[] = [5, 10, 20]; // Options for items per page
  selectedItemsPerPage: number = 5; // Default selected items per page
  currentPage: number = 1; // Initial current page number
  ngOnInit(): void {
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.getAllPaiements()
   
  }
  getAllPaiements():void { this.backendService.getPaiementsPrevus().subscribe(data => {
    console.log('res ' , data)
    this.depenses = data;
  } , error => {
    console.error(error)
  });
}

  openModal(): void {
    const dialogRef = this.dialog.open(PaiementprevusFormComponent, {
      width: '500px',
    
      data: { form:this.form }
      
    });
    debugger;  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // modifierDepense(depense: Depense): void {
  //   console.log('Modification de l\'depense :', depense);
  //   this.backendService.modifierDepense(depense).subscribe(res => {
  //   }, error => {
  //     console.error(error);
  //   });
  // }

  test(): void {
    console.log('Modification de l\'depense :');
  }

  supprimerPaiementPrevu(depense: Depense): void {
    console.log('Suppression de l\'depense :', depense);
    this.backendService. deleteData(depense).subscribe(res => {
    }, error => {
      console.error(error);
    });
    Swal.fire({
      title: 'Etes vous sûr ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez le!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimée!',
          'Paiement prévu supprimé.',
          'success'
        )
      }
    })
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1; // Reset to the first page when items per page changes
 }
 
 onPageChange(page: number): void {
    this.currentPage = page;
 }
 getDisplayingFrom(): number {
  if (this.depenses.length === 0) {
    return 0;
  }
  return (this.currentPage - 1) * this.selectedItemsPerPage + 1;
}

getDisplayingTo(): number {
  const lastItemIndex = this.currentPage * this.selectedItemsPerPage;
  return Math.min(lastItemIndex, this.depenses.length);
}
  
}
