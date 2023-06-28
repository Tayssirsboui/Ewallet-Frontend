import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Depense } from 'src/app/models/depense.model';
import { BackendService } from 'src/app/_services/backend.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PagesLoginComponent } from '../../pages-login/pages-login.component';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';
@Component({
  selector: 'app-paiementprevus-form',
  templateUrl: './paiementprevus-form.component.html',
  styleUrls: ['./paiementprevus-form.component.css']
})
export class PaiementprevusFormComponent implements OnInit {
  categories: any[]
  depenses: any = []
  depense :Depense = {
    description: '', datePrevue: new Date(), montant: 0,
    idDepense: 0, date: new Date() , statut:'', userId: 1, categorieId:1
  };
  descriptionControl = new FormControl('');
  montantControl = new FormControl('');
  dateprevueControl = new FormControl('');
  private login:PagesLoginComponent;

  form: FormGroup;

  constructor(private route: ActivatedRoute, 
     private router: Router, 
         private backendService: BackendService,
    public dialogRef: MatDialogRef<PaiementprevusFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categorieService: CategorieService,

  ) {
  }
  ngOnInit(): void {
    this.backendService.getPaiementsPrevus().subscribe(depenses => {
      this.depenses = depenses;
    
      console.log("hhhhh",this.depenses) 
    
    },
    error => {
      // Gérez les erreurs de requête ici
      console.log(error);
    }
  );
  }

  onAnnuler(): void {
    // this.dialogRef.close();
    this.backendService.getPaiementsPrevus().subscribe(depenses => {
      this.depenses = depenses;
    
      console.log("hhhhh",this.depenses) 
    
    },
    error => {
      // Gérez les erreurs de requête ici
      console.log(error);
    }
  );
  }

  onAjouter(): void {
    this.depense.statut = "TODO"; 
    this.depense.userId=1;
 
    this.depense.categorieId=1;
    this.depense.idDepense=null as any;
    console.log(this.depense)
    /*this.backendService.createEvent(this.depense).subscribe(result => {
      this.router.navigate(['/depenses']);
      this.dialogRef.close(this.depense);
    });*/
  }
  

}
