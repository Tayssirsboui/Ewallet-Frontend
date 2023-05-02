import { Component, OnInit ,ElementRef} from '@angular/core';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';

declare var $: any;
@Component({
  selector: 'app-types-categories',
  templateUrl: './types-categories.component.html',
  styleUrls: ['./types-categories.component.css']
})

export class TypesCategoriesComponent implements OnInit {
  form: any = {
    typeCategorie: null,
    description: null,
    date: null
  };
  afficherFormulaire: boolean=false;

  constructor(private elementRef: ElementRef,private categorieService:CategorieService) { }
  
    
  categories: Categorie[];

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
  ajouterCategorie() {
    this.afficherFormulaire = true;
  }
}
