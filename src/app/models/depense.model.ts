import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class Depense {
  constructor(
    public id: number,
    public description: string,
    public montant: number ,

  ) { }

}