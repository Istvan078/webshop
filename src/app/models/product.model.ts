export class Product {
  photoUrl?: string;
  number: number;
  constructor(
    public price: number = 0,
    public key: string = "",
    public description: string = "",
    public name: string = "",
    public quantity: number = 0,
  ) {
    this.number = 0
  }

}
