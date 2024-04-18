import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  basket: Product[] = [];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('products').subscribe((state) => {
      this.basket = state.basket;
      console.log(this.basket);
    });
  }
}
