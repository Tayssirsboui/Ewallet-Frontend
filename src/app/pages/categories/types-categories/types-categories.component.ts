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
    typeCategorie: null,
    description: null,
    date: null
  };
  afficherFormulaire: boolean=false;

  constructor(private elementRef: ElementRef,private categorieService:CategorieService,private dialog: MatDialog) { }
  
    
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

  openModal(): void {
    const dialogRef = this.dialog.open(CategorieFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
