import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions'
import * as fromApp from '../../store/app.reducer' 
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { selectProducts } from './store/products.selectors';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products:Product[] = []
  product: Product = new Product()
  isLoading: boolean = false
  error: string = ""
  constructor(private store: Store<fromApp.AppState>, private base: BaseService) {
    this.store.select(selectProducts).subscribe(
      (prods) => this.products = prods
    )
    
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.getProduct())
    this.store.select('products').subscribe(productsState => {
      console.log(productsState)
      this.isLoading = productsState.loading
      this.error = productsState.error
      if(this.error) {
        this.showErrorAlert(this.error)
      }
    })
  }

  showErrorAlert(error: string) {
    alert(error)
  }

  addProduct() {
    // this.base.addProductAdmin(this.product)
    this.store.dispatch(ProductsActions.AddProduct({product:this.product}))
    this.product = new Product()
    
    console.log(this.products);
  }

  deleteProduct(prod: Product) {
    this.store.dispatch(ProductsActions.deleteProduct(prod))
  }
}
