// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UtilisateurService } from 'src/app/_services/utilisateur.service';
// import { Utilisateur } from 'src/app/utilisateur';

// @Component({
//   selector: 'app-utilisateur-form',
//   templateUrl: './utilisateur-form.component.html',
//   styleUrls: ['./utilisateur-form.component.css']
// })

// export class UtilisateurFormComponent implements OnInit {
//   name: string;
//   description: string;
//   date: Date;
//   utilisateur: Utilisateur;
//   form: FormGroup;
//   // constructor(private route: ActivatedRoute, 
//   //   private router: Router, 
//   //     private utilisateurService: UtilisateurService,
//   //     private formBuilder: FormBuilder,
//   //     private dialogRef: MatDialogRef<UtilisateurFormComponent>) { 
//   //       this.utilisateur= new Utilisateur();
//       // }

//       constructor(public dialogRef: MatDialogRef<UtilisateurFormComponent>,
//         @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog) {}
//   ngOnInit(): void {
  
//   }
  

//   // onSubmit() {
//   //   if (this.form.valid) {
//   //     this.dialogRef.close(this.form.value);
//   //   }
//     // this.utilisateurService.save(this.utilisateur).subscribe(result => this.gotoUtilisateursList());
//   // }
  

//   // gotoUtilisateursList() {
//   //   this.router.navigate(['/utilisateurs']);
//   // }

// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/utilisateur';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.css']
})
export class UtilisateurFormComponent implements OnInit {
  utilisateur :Utilisateur = {
    nom: '', prenom: '', email: '',motDePasse:'',
    idUtilisateur: '',soldeDeCompte:0
  };
  nomControl = new FormControl('');
  prenomControl = new FormControl('');
  emailControl = new FormControl('');

  form: FormGroup;

  constructor(private route: ActivatedRoute, 
     private router: Router, 
         private utilisateurService: UtilisateurService,
    public dialogRef: MatDialogRef<UtilisateurFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
  
      }

  onAnnuler(): void {
    this.dialogRef.close();
  }

  onAjouter(): void {
    
      // if (this.form.valid) {
      //    this.dialogRef.close(this.form.value);
      //   }
          this.utilisateurService.save(this.utilisateur).subscribe(res => 
            {
              Swal.fire('Utilisateur ajouté!', '','success')

              this.dialogRef.close();
            } , error => {
              console.error(error)
            });
    // this.dialogRef.close(this.utilisateur);
  }
   gotoUtilisateursList() {
     this.router.navigate(['/utilisateurs']);
  }

}

