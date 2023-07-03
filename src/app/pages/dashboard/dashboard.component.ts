import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";
import { CategorieService } from 'src/app/_services/categorie.service';
import { BackendService } from "src/app/_services/backend.service";

import Chart from 'chart.js/auto';
import { Depense } from "src/app/models/depense.model";
import { RevenusService } from "src/app/_services/revenuservice.service";
import { UtilisateurService } from "src/app/_services/utilisateur.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  public chart: any;
  public lineChart: any;
  depenses: any = []
  categories: any = []
  montants: any = []
  lineChartData: any = []
  filteredDepenses: Depense[];
  searchedKeyword!:string;
  itemsPerPageOptions: number[] = [5, 10, 20]; // Options for items per page
  selectedItemsPerPage: number = 5; // Default selected items per page
  currentPage: number = 1; // Initial current page number
  recentDepenses: any;
  totalAmount: number = 0 ;
  revenusTotal: number = 0;
  soldeDeCompte : number = 0;
  userdata:any;
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
    private backendService: BackendService,
    private revenusService: RevenusService,
    private utilisateurService: UtilisateurService
  ) { 
    this.userdata=JSON.parse(sessionStorage.getItem('auth-user')!)
  }


  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.loadCategorieMontantData()
    this.loadLineChartData()
    this.getTotalDepenseAmount()
    this.getSoldeDeCompte()
    this.getTotalRevenuAmount()
    this.backendService.getPaiementsPrevus().subscribe(data => {
      console.log('res ' , data)
      this.depenses = data;
    } , error => {
      console.error(error)
    });
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
  

  createLineChart() {
    console.log("dates", this.lineChartData[0]);
    this.lineChart = new Chart("MyLineChart", {
      type: 'line',
      data: {
        labels: this.lineChartData[0].map((date:any)  => new Date(date).toLocaleDateString('fr-FR')),
        datasets: [
          {
            label: "Dépenses",
            data: this.lineChartData[1],
            backgroundColor: 'blue'
          },
          {
            label: "Revenus",
            data: this.lineChartData[2],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
  // createLineChart(){
  //  console.log("dates",this.lineChartData[0])
  //   this.lineChart = new Chart("MyLineChart", {
  //     type: 'line', //this denotes tha type of chart
  //     data: {// values on X-Axis
  //       labels: this.lineChartData[0], 
	//        datasets: [
  //         {
  //           label: "Dépenses",
  //           data: this.lineChartData[1],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: "Revenus",
  //           data: this.lineChartData[2],
  //           backgroundColor: 'limegreen'
  //         }  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }
      
  //   });
  // }
  createChart() {
    this.chart = new Chart("MyChart", this.options);
  }
 
  // createLineChart(){
  // debugger
  //   this.lineChart = new Chart("MyLineChart", this.options1);
  // }

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

  
  loadLineChartData() {
    this.backendService.chartDepenseRevenuData().subscribe(
      chartData => 
      {
       this.lineChartData=chartData
        this.createLineChart();
        
      },
      error => {
        // Gérez les erreurs de requête ici
        console.log(error);
      }
    );
  }
  
  getTotalDepenseAmount() {
    this.backendService.getTotalDepenseAmount(this.userdata.idUtilisateur).subscribe(
      totalAmount => {
        this.totalAmount = totalAmount;
  
      },
      
      error => {
        console.log(error);
      }
    );
  }


  getTotalRevenuAmount() {
    this.revenusService.getTotalRevenuAmount(this.userdata.idUtilisateur).subscribe(
      revenusTotal => {
        this.revenusTotal = revenusTotal;
  
      },
      
      error => {
        console.log(error);
      }
    );
  }
  getSoldeDeCompte(){
    this.utilisateurService.getSoldeDeCompte(this.userdata.idUtilisateur).subscribe(
      soldeDeCompte => {
        this.soldeDeCompte = soldeDeCompte;
  
      },
      
      error => {
        console.log(error);
      }
    );
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1; // Reset to the first page when items per page changes
 }
 
 onPageChange(page: number): void {
    this.currentPage = page;
 }
 getDisplayingFrom(): number {
  if (this.depenses.length === 0) {
    return 0;
  }
  return (this.currentPage - 1) * this.selectedItemsPerPage + 1;
}

getDisplayingTo(): number {
  const lastItemIndex = this.currentPage * this.selectedItemsPerPage;
  return Math.min(lastItemIndex, this.depenses.length);
}
}
