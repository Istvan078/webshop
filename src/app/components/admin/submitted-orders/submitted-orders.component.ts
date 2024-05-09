import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppState from '../../../store/app.reducer';
import { Product } from '../../../models/product.model';
import { Order } from '../../../models/order.model';
import deepmerge from 'deepmerge';
import * as OrderActions from '../../order/store/order.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-submitted-orders',
  templateUrl: './submitted-orders.component.html',
  styleUrl: './submitted-orders.component.scss',
})
export class SubmittedOrdersComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsCopy: Product[] = [];
  orders: Order[] = [];
  ordersCopy: Order[] = [];
  areProductsFiltered: boolean = false;
  ordersSub!: Subscription;
  productsSub!: Subscription;
  constructor(private store: Store<AppState.AppState>) {}

  ngOnInit(): void {
    this.init();
    new Promise((res) => {
      this.productsSub = this.store.select('products').subscribe((state) => {
        this.products = state.products;
        res('***TERMÉKEK BEÁLLÍTVA***');
      });
    }).then((res) => {
      console.log(res);
      this.ordersSub = this.store.select('orders').subscribe((state) => {
        this.orders = state.orders;
        if (this.orders.length && !this.areProductsFiltered)
          this.filterProducts();
        console.log('***RENDELÉSEK BEÁLLÍTVA***');
      });
    });
  }

  init() {
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
    this.areProductsFiltered = true;
  }

  ngOnDestroy(): void {
    if (this.productsSub) this.productsSub.unsubscribe();
    if (this.ordersSub) this.ordersSub.unsubscribe();
  }
}
