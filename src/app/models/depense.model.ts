import { Inject } from '@angular/core';
@Inject({
  providedIn: 'root'
})

export class Depense {
  constructor(
    public idDepense: number,
    public description: string,
    public montant: number ,
    public date:Date,
    public datePrevue:Date,
    public statut:String,
    public userId:Number,
    public categorieId:Number

  ) { }

}