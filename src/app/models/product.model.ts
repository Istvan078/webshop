export class Product {
  photoUrl?: string;
  number: number;
  subcategory: { key: string; queryPar: string; subcat: string };
  featured: boolean;
  discount?: number;
  orderQuantity?: number = 1;
  constructor(
    public price: number = 0,
    public key: string = '',
    public description: string = '',
    public name: string = '',
    public available: number = 0
  ) {
    this.number = 0;
    this.subcategory = { key: '', queryPar: '', subcat: '' };
    this.featured = false;
  }
}
