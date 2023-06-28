import { Inject } from '@angular/core';
import { Categorie } from '../categorie';
@Inject({
  providedIn: 'root'
})

export class Depense {
 
     idDepense: number;
     description: string;
     montant: number;
     date:Date;
     datePrevue:Date;
     statut:string;
     userId:number;
     categorieId:number

  constructor() { }

}