import {  Component ,ElementRef} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'admindashboard';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  nom?: string;
  constructor(private tokenStorageService: TokenStorageService,private elementRef: ElementRef,  public  _router: Router,private dialog: MatDialog) { }
 


  ngOnInit() {


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
     
      this.nom = user.nom;
    }
  }

  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
