import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as OrderActions from './store/order.actions';
import { Product } from '../../models/product.model';
import * as ProductsActions from '../products/store/products.actions';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import deepmerge from 'deepmerge';
import { BaseService } from '../../services/base.service';
import * as AuthActions from '../admin/store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit, OnDestroy {
  basket: Product[] = [];
  order: Order = new Order();
  isPersonalDetails: boolean = false;
  isDelivDetails: boolean = false;
  isFinalizeOrder: boolean = false;
  user: any;
  productsSub!: Subscription;
  authSub!: Subscription;
  ordersSub!: Subscription;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private base: BaseService
  ) {}

  ngOnInit(): void {
    this.productsSub = this.store.select('products').subscribe((state) => {
      this.basket = state.basket;
      this.basket = deepmerge(this.basket, []);
      this.calcPrice();
    });
    this.authSub = this.store
      .select('auth')
      .subscribe((state) => (this.user = state.user));
    this.store.dispatch(OrderActions.getOrders());
    let orderNumbers: number[] = [];
    this.ordersSub = this.store.select('orders').subscribe((state) => {
      const lastOrder = state.orders
        .map((order) => {
          if (order.orderNumber) orderNumbers.push(order.orderNumber);
          return order;
        })
        .find((order) => {
          return order.orderNumber === Math.max(...orderNumbers);
        });
      if (lastOrder?.orderNumber)
        this.order.orderNumber = lastOrder.orderNumber;
      if (this.user) this.order._personalDetails.email = this.user.email;
    });
  }

  calcPrice() {
    this.basket = this.basket.map((prod) => {
      prod.price = +prod.price * +prod.orderQuantity!;
      return prod;
    });
  }

  deleteProdFromCart(product: Product) {
    //  this.basket = this.basket.filter((prod) => prod.key !== key)
    this.store.dispatch(ProductsActions.removeFromBasket(product));
  }

  startOrder() {
    this.isPersonalDetails = true;
    setTimeout(() => {
      if (this.base.isDarkMode)
        document
          .querySelectorAll('input')
          .forEach((inp) => inp.classList.add('input-darkmode'));
    }, 500);
  }

  async submitOrder() {
    const order = await new Promise((res) => {
      this.order.orderDate = new Date().toLocaleDateString();
      this.order.productsKeys = this.basket.map((prod) => prod.key);
      if (!this.order.orderNumber) this.order.orderNumber = 1;
      else this.order.orderNumber = this.order.orderNumber + 1;
      this.order.products = this.basket.map((prod) => ({
        key: prod.key,
        orderQuantity: prod.orderQuantity as number,
        price: prod.price,
      }));
      this.store.dispatch(OrderActions.addOrder(this.order));
      this.store.dispatch(ProductsActions.clearBasket());
      res('****RENDELÉS ELKÜLDVE****');
    });
    console.log(order);
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.ordersSub) this.ordersSub.unsubscribe();
    if (this.productsSub) this.productsSub.unsubscribe();
  }
}
