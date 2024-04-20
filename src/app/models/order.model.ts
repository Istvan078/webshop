import { Product } from "./product.model";

export class Order {
    public key: string
    public productsKeys: string[]
    public products: Product[] | any[]
    public _personalDetails: {
         firstName: string;
         surName: string;
         address: string;
         phoneNumber: string;
         email: string;

    } = {
        firstName : "",
        surName: "",
        address: "",
        phoneNumber: "",
        email: ""
    }

    public _paymentType: string

    public _deliveryType: string
    public _packagePoint?: string

    constructor() {
        this.key = ""
        this._paymentType = ""

        this._deliveryType = ""
        this.products = []
        this.productsKeys = []
        // this.orderedProducts = []
    }

    set firstName(firstName:string) {
        this._personalDetails.firstName = firstName
    } 
    set surName(surName:string) {
        this._personalDetails.surName = surName
    } 
}