import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as ProductsActions from '../products/store/products.actions'
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  
  product: Product = new Product()
  isEditMode: boolean = false

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (data: any) => {
        if(data.name) {
          this.isEditMode = true
          this.product = {...data}
          this.product.price = +data.price
          this.product.quantity = +data.quantity
        }
      }
    )
  }

  async setTimeout(sec: number) {
    return new Promise((res) => {
    setTimeout(() => {   
      res('')    
    }, sec * 1000);
  })
  }

  async addProduct() {
    document.querySelector('.mainContainer')?.classList.add('fade')
    await this.setTimeout(1)
    this.store.dispatch(ProductsActions.AddProduct({ product: this.product }));
    // this.product = new Product();
  }

  async updateProduct() {
    document.querySelector('.mainContainer')?.classList.add('fade')
    await this.setTimeout(1)
    // console.log(this.product)
    this.store.dispatch(ProductsActions.updateProduct({ product: this.product}))
  }
}
