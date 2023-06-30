import { Inject } from '@angular/core';
@Inject({
  providedIn: 'root'
})

export class Revenu{
  

     idRevenu: number;
     source: string;
     montant: number ;
     date:Date;
     userId:number


  constructor() { }

}