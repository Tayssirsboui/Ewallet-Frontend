export class CategorieDepenseDto {
    nom: string;
    somme_montant: number;
    
    constructor(nom: string, somme_montant: number) {
      this.nom = nom;
      this.somme_montant = somme_montant;
    }
  }