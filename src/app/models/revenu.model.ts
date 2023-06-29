import { Inject } from '@angular/core';
@Inject({
  providedIn: 'root'
})

export class Revenu{
  
  constructor(
    public idRevenu: number,
    public description: string,
    public montant: number ,
    public date:Date,
    public userId:number


  ) { }

}