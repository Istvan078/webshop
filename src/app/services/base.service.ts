import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  path: string = "products"
  productsRef: AngularFireList<Product>
  constructor(private rTDatabase: AngularFireDatabase) {
    this.productsRef = rTDatabase.list(this.path)
  }

  addProductAdmin(product: Product) {
    this.productsRef.push(product)
  }
}
