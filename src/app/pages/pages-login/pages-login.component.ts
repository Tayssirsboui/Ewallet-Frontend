import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})

  export class PagesLoginComponent implements OnInit {
    form: any = {
      email: null,
      motDePasse: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
  
    constructor( private tokenStorage: TokenStorageService, private  authService:AuthService,private router: Router) { }
  
    ngOnInit(): void {
      window.sessionStorage.removeItem("auth-token");
      window.sessionStorage.removeItem("auth-user");
      localStorage.clear()
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
      }
    }

  
    onSubmit(): void {
      const { email, motDePasse } = this.form;
      
  
      this.authService.login(email, motDePasse).subscribe(
        
        data => {
          console.log('res ' , data)
          this.tokenStorage.saveToken(data.token);
          localStorage.setItem('accessToken' ,data.token)
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
          //this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
      
     
    }
  
    reloadPage(): void {
      window.location.reload();
    }
    getConnectedUserId(): any{
      console.log("enter the method")
      let userData = window.sessionStorage.getItem('auth-user');

      // Check if the user ID exists
      if (userData) {
        // Use the user ID as needed
        console.log('User ID:', userData);
      } 
    }
}
