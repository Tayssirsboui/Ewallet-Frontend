import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";
import { CategorieService } from 'src/app/_services/categorie.service';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  public chart: any;
  categories: any = []
  montants: any = []
  data!:any

  constructor(private elementRef: ElementRef,
    private categorieService: CategorieService,
    ) { }


  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.loadCategorieMontantData()
    this.createChart()
  }
  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart
      
      data: {// values on X-Axis
        labels: this.categories,
        datasets: [{
          data: this.montants,
          hoverOffset: 4,

        }],
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }


  loadCategorieMontantData() {
    this.categorieService.listDepenseByCategory().subscribe(
      data => {
        this.data = data
        this.data.forEach( (item:any) => {
          this.categories.push(item.nom)
          this.montants.push(item.sommeMontant)
       });

       debugger
      },
      error => {
        // Gérez les erreurs de requête ici
        console.log(error);
      }
    );
  }

}
