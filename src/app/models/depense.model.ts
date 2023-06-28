import { Inject } from '@angular/core';
import { Categorie } from '../categorie';
@Inject({
  providedIn: 'root'
})

export class Depense {
 
     idDepense: number;
     description: string;
    public montant: number;
    public date:Date;
    public datePrevue:Date;
    public statut:String;
    public userId:Number;
    public categorie:Categorie

  constructor() { }

}