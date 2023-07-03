import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:any ;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(window.sessionStorage.getItem("auth-user") as string) ;
    console.log("csdsq" , this.user.role)

  }

}
