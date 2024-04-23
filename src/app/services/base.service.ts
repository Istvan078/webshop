import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from '../models/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  path: string = "products"
  productsRef: AngularFireList<Product>
  isDarkMode: boolean = false
  colorModesSubject: Subject<any> = new Subject()
  constructor(private rTDatabase: AngularFireDatabase) {
    this.productsRef = rTDatabase.list(this.path)
    this.colorModesSubject.subscribe((bool) => this.isDarkMode = bool)
  }

  addProductAdmin(product: Product) {
    this.productsRef.push(product)
  }

  
}
