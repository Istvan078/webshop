import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as OrderActions from './store/order.actions'
import { Product } from '../../models/product.model';
import * as ProductsActions from '../products/store/products.actions'
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import deepmerge from 'deepmerge';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  basket: Product[] = [];
  order: Order = new Order()
  isPersonalDetails: boolean = false;
  isDelivDetails: boolean = false;
  isFinalizeOrder: boolean = false
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('products').subscribe((state) => {
      this.basket = state.basket;
      this.basket = deepmerge(this.basket, [])
      this.calcPrice()
      console.log(this.basket);
    });
  }

  calcPrice() {
    this.basket = this.basket.map((prod) => {
      prod.price = (+prod.price * +prod.orderQuantity!)
      return prod
    })
  }

  deleteProdFromCart(product: Product) {
  //  this.basket = this.basket.filter((prod) => prod.key !== key)
    this.store.dispatch(ProductsActions.removeFromBasket(product))
}

startOrder() {
  this.isPersonalDetails = true
}

async submitOrder() {
  const order = await new Promise((res) => {
    this.order.productsKeys = this.basket.map((prod) => prod.key)
    this.order.products = this.basket.map((prod) => ({key: prod.key, orderQuantity: prod.orderQuantity as number, price: prod.price}))
    this.store.dispatch(OrderActions.addOrder(this.order))
    this.store.dispatch(ProductsActions.clearBasket())
    res('****RENDELÉS ELKÜLDVE****')
  })
  console.log(order)
  this.router.navigate([''])
}
}
