import { Component, OnInit ,ElementRef} from '@angular/core';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';
import { MatDialog } from '@angular/material/dialog';
import { CategorieFormComponent } from '../categorie-form/categorie-form.component';

declare var $: any;
@Component({
  selector: 'app-types-categories',
  templateUrl: './types-categories.component.html',
  styleUrls: ['./types-categories.component.css']
})

export class TypesCategoriesComponent implements OnInit {
  form: any = {
    nom: null,
    description: null,
    budget: null
  };
  afficherFormulaire: boolean=false;

  constructor(private elementRef: ElementRef,private categorieService:CategorieService,private dialog: MatDialog) { }
  
    
  categories: Categorie[];
  filteredCategories: Categorie[];
  searchKeyword: string = '';

  ngOnInit(): void {
    this.categories = [
      {
        idCategorie: '1',
        nom: 'Alimentation',
        description: 'Épicerie, magasin, marché',
        budget: 500
      },
      {
        idCategorie: '2',
        nom: 'Logement',
        description: 'Loyer, électricité, internet,  syndic, etc.',
        budget: 800
      },
      {
        idCategorie: '3',
        nom: 'Transport',
        description: 'Transports en commun, stationnement, essence, assurance automobile, entretien de la voiture, taxi',
        budget: 400
      },
      {
        idCategorie: '4',
        nom: 'Education',
        description: 'Frais de scolarité,études, fourniture, ordinateur, etc.',
        budget: 700
      }, 
      {
        idCategorie: '5',
        nom: 'Santé et soins personnels',
        description: 'Coiffure, produits de beauté, dentiste,médecin, médicaments, etc.',
        budget: 200
      },

      {
        idCategorie: '6',
        nom: 'Loisirs',
        description: 'Sports, cinéma, anniversaire etc.',
        budget: 200
      }
    ];
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
  }
}
