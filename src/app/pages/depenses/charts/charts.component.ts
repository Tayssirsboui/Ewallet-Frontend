import { Component, OnInit ,ElementRef} from '@angular/core';

@Component({
   selector: 'app-charts',
   
   templateUrl: './charts.component.html',
   styleUrls: ['./charts.component.css']
 })
 export class ChartsComponent implements OnInit {

   constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
   }

 }
 