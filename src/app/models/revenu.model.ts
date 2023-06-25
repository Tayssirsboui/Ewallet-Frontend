import { Inject } from '@angular/core';
@Inject({
  providedIn: 'root'
})

export class Revenu{
  constructor(
    public idRevenu: number,
    public source: string,
    public montant: number ,
    public date:Date,

  ) { }

}