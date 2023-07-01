import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent implements OnInit {
  categorie :Categorie = {
    nom: '', description: '',
    idCategorie: 0,
    budget:0

  };
  isModif:any;
  descriptionControl = new FormControl('');
 typeCategorieControl = new FormControl('');
  dateControl = new FormControl('');

  form: FormGroup;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private categorieService: CategorieService,
        public dialogRef: MatDialogRef<CategorieFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any)
         {}
  
  ngOnInit(): void {
    this.categorie.idCategorie=this.data.form.idCategorie;
    this.categorie.description=this.data.form.description;
    this.categorie.budget=this.data.form.budget;
    this.categorie.nom=this.data.form.nom;
    this.isModif=this.data.isModif;
  }

  onAnnuler(): void {
    this.dialogRef.close();
  }

  onAjouter(): void {
    
      // if (this.form.valid) {
      //    this.dialogRef.close(this.form.value);
      //   }
      console.log("cattt", this.data.modif)
          this.categorieService.save(this.categorie).subscribe(
            result =>     this.dialogRef.close()

            );
    // this.dialogRef.close(this.categorie);
  }


  // onDateChange(event: MatDatepickerInputEvent<Date>): void {
  //   this.categorie.date = event.value || null;
  // }
}
