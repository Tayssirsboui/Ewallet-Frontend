import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { UtilisateurService } from 'src/app/_services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  profile:Profile = new Profile();
  formProfile:FormGroup;
  submitted:boolean = false ;
  constructor(private utilisateurService:UtilisateurService, private fb:FormBuilder , private router:Router) {
    this.formProfile = this.fb.group({
      nom:['' , [Validators.required]],
      prenom:['' , [Validators.required]],
      email:['' , [Validators.required , Validators.email]]
    })
   }
 
  ngOnInit(): void {
    this.getProfile()
  }

  get f() {
    return this.formProfile.controls;
  }

  getProfile()
  {
    this.utilisateurService.getProfile().subscribe(res => {
        this.profile = res
    } , error => {
        console.error(error)
    } , () => {
      this.formProfile.patchValue({
        nom:this.profile.nom,
        prenom:this.profile.prenom,
        email:this.profile.email
      })
    })
  }

  onSubmit()
  {
      this.submitted = true ;
      if(this.formProfile.invalid)
      {
        return ;
      }

      let data:Profile = {
        id:this.profile.id ,
        nom :  this.f['nom'].value,
        prenom :   this.f['prenom'].value,
        email :    this.f['email'].value,
        solde:this.profile.solde
      }

      this.utilisateurService.updateProfile(data).subscribe(res => {
        Swal.fire('Profil mis à jour!', '','success')
        this.router.navigate(['login'])
      } , error => {
        console.error(error)
      })
  }
}
