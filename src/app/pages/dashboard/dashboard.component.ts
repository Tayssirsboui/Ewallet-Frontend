import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";
import { CategorieService } from 'src/app/_services/categorie.service';
import { BackendService } from "src/app/_services/backend.service";

import Chart from 'chart.js/auto';
import { Depense } from "src/app/models/depense.model";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  public chart: any;
  categories: any = []
  montants: any = []
  recentDepenses: any;
  totalAmount: number;
  data!: any
  options: any = {
    type: 'doughnut', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: [],
      datasets: [{
        data: [],
        hoverOffset: 4,

        backgroundColor: [
          'red',
          'pink',
          'green',
          'yellow',
          'orange',
          'blue',
        ],
      }],
    },
    options: {
      aspectRatio: 2.5
    }

  }
  constructor(private elementRef: ElementRef,
    private categorieService: CategorieService,
    private backendService: BackendService
  ) { }


  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.loadCategorieMontantData()
    this.getTotalDepenseAmount()
    this.backendService.findLastDepenses().subscribe(depenses => {
      this.recentDepenses = depenses;
    
      console.log("hhhhh",this.recentDepenses) 
    
    },
    
    error => {
      // Gérez les erreurs de requête ici
      console.log(error);
    }
  );
    
  }
  createChart() {
    this.chart = new Chart("MyChart", this.options);
  }
 


  loadCategorieMontantData() {
    this.categorieService.listDepenseByCategory().subscribe(
      data => {
        this.data = data
        this.options.data.labels = this.data.map(function (obj: any) {
          return obj.nom;
        })

        this.options.data.datasets[0].data = this.data.map(function (obj: any) {
          return obj.sommeMontant;
        })
        this.createChart()

       
      },
      error => {
        // Gérez les erreurs de requête ici
        console.log(error);
      }
    );
  }
  getTotalDepenseAmount() {
    this.backendService.getTotalDepenseAmount().subscribe(
      totalAmount => {
        this.totalAmount = totalAmount;
  
      },
      
      error => {
        console.log(error);
      }
    );
  }

}
