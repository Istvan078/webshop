export class Product {
  photoUrl?: string;
  number: number;
  subcategory: {key: string, queryPar: string, subcat: string};
  featured: boolean;
  discount?: number;
  constructor(
    public price: number = 0,
    public key: string = "",
    public description: string = "",
    public name: string = "",
    public quantity: number = 0,
  ) {
    this.number = 0
    this.subcategory = {key: "", queryPar: "", subcat: ""}
    this.featured = false
  }

}
