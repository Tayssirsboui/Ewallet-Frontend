import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { BackendService } from 'src/app/_services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   notifs :[];
   user:any ;
   msg:string="";
  constructor(@Inject(DOCUMENT) private document: Document,private backendService:BackendService) { }

  ngOnInit(): void {
   
    this.getAllNotifs();
    this.backendService.notification$.subscribe((msg: string) => {
      if(msg =='nouvelle notif' || msg=='paiement prevu')
      {
        this.getAllNotifs();
      }
     
    });
    this.user = JSON.parse(window.sessionStorage.getItem("auth-user") as string) ;
  }

  getAllNotifs():void {
    this.backendService.notifPaiementPrevu().subscribe(data => {
   console.log('notifs ' , data)
   this.notifs = data;
 } , error => {
   console.error(error)
 });
}
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
