import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../store/app.reducer';
import { Order } from '../../../models/order.model';
import { Product } from '../../../models/product.model';
import * as OrderActions from '../../order/store/order.actions';
import * as ProductsActions from '../../products/store/products.actions';
import deepmerge from 'deepmerge';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsCopy: Product[] = [];
  orders: Order[] = [];
  ordersCopy: Order[] = [];
  user: any;
  areProductsFiltered: boolean = false;
  ordersSub!: Subscription;
  productsSub!: Subscription;
  authSub!: Subscription;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.init();
    new Promise((res) => {
      this.productsSub = this.store.select('products').subscribe((state) => {
        this.products = state.products;
        res('***TERMÉKEK BEÁLLÍTVA***');
      });
      this.authSub = this.store.select('auth').subscribe((state) => {
        this.user = state.user;
        res('***FELHASZNALO BEÁLLÍTVA***');
      });
    }).then((res) => {
      console.log(res);
      this.ordersSub = this.store.select('orders').subscribe((state) => {
        this.orders = state.orders.filter(
          (order) => order._personalDetails.email === this.user.email
        );
        if (this.orders.length && !this.areProductsFiltered)
          this.filterProducts();
        console.log('***RENDELÉSEK BEÁLLÍTVA***');
      });
    });
  }

  init() {
    this.store.dispatch(ProductsActions.getProduct());
    this.store.dispatch(OrderActions.getOrders());
  }

  filterProducts() {
    this.ordersCopy = [];
    this.ordersCopy = deepmerge(this.ordersCopy, this.orders);
    this.productsCopy = deepmerge(this.products, []);
    this.products = deepmerge(this.products, []);
    this.ordersCopy.forEach((ord) => {
      this.productsCopy = this.products.filter((prod) => {
        if (ord.productsKeys.includes(prod.key))
          ord.products.forEach((prd) => {
            if (prd.key === prod.key) prd.name = prod.name;
          });
      });
    });
    this.ordersCopy.reverse();
    this.areProductsFiltered = true;
  }
  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.productsSub) this.productsSub.unsubscribe();
    if (this.ordersSub) this.ordersSub.unsubscribe();
  }
}
