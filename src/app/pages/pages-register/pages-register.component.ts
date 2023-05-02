import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
// import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {
  form: any = {
    nom: null,
    email: null,
    motDePasse: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
   
 
  
  constructor(private  authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nom, email, motDePasse } = this.form;
   
  
    this.authService.register(nom, email, motDePasse).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });



    this.router.navigate(['/pages-login']);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Compte crée avec succés'
    })
    
  }
}
