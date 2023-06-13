import { Inject } from '@angular/core';
@Inject({
  providedIn: 'root'
})

export class Depense {
  constructor(
    public id: number,
    public description: string,
    public montant: number ,
    public date:Date,

  ) { }

}