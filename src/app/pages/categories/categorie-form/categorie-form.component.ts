import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent implements OnInit {

  categorie: Categorie;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private categorieService: CategorieService) {
    this.categorie = new Categorie();
  }
  
  ngOnInit(): void {
  }

  onSubmit() {
    this.categorieService.save(this.categorie).subscribe(result => this.gotoCategoriesList());
  }

  gotoCategoriesList() {
    this.router.navigate(['/categories']);
  }

}
