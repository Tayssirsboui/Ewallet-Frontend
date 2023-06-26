import { Component, OnInit ,ElementRef} from '@angular/core';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';
import { MatDialog } from '@angular/material/dialog';
import { CategorieFormComponent } from '../categorie-form/categorie-form.component';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-types-categories',
  templateUrl: './types-categories.component.html',
  styleUrls: ['./types-categories.component.css']
})

export class TypesCategoriesComponent implements OnInit {
  p:number = 1 ;
  form: any = {
    nom: null,
    description: null,
    budget: null
  };
  afficherFormulaire: boolean=false;
 

  constructor(private elementRef: ElementRef,private categorieService:CategorieService,private dialog: MatDialog) { }
  
    
  categories: Categorie[];
  filteredCategories: Categorie[];
  searchedKeyword!:string;
  itemsPerPageOptions: number[] = [5, 10, 20]; // Options for items per page
  selectedItemsPerPage: number = 5; // Default selected items per page
  currentPage: number = 1; // Initial current page number
  ngOnInit(): void {
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);


    this.categorieService.findAll().subscribe(data => {
      console.log('res ' , data)
      this.categories = data;
    } , error => {
      console.error(error)
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CategorieFormComponent, {
      width: '500px',
      data: { form:this.form }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  updateCategories(categorie: Categorie): void {
    this.form.nom=categorie.nom; 
    this.form.description=categorie.description; 
    this.form.budget=categorie.budget; 
    this.openModal();
    console.log('Modification de la catégorie :', categorie);
    this.categorieService.updateCategories(categorie).subscribe(res => {
    }, error => {
      console.error(error);
    });
  }

  deleteCategories(categorie: Categorie): void {
    console.log('Suppression de la categorie :', categorie);
    this.categorieService.deleteCategories(categorie).subscribe(res => {
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
      confirmButtonText: 'Oui, supprimez la!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimée!',
          'Catégorie supprimée.',
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
  if (this.categories.length === 0) {
    return 0;
  }
  return (this.currentPage - 1) * this.selectedItemsPerPage + 1;
}

getDisplayingTo(): number {
  const lastItemIndex = this.currentPage * this.selectedItemsPerPage;
  return Math.min(lastItemIndex, this.categories.length);
}
}
