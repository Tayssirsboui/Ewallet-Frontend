import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})

  export class PagesLoginComponent implements OnInit {
    form: any = {
      nom: null,
      motDePasse: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
  
    constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  
    ngOnInit(): void {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
      }
    }
  
    onSubmit(): void {
      const { nom, motDePasse } = this.form;
  
      this.authService.login(nom, motDePasse).subscribe(
        (data:any) => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        (err:any) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  
    reloadPage(): void {
      window.location.reload();
    }
}
