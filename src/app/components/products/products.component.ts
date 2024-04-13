import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions';
import * as fromApp from '../../store/app.reducer';
import { Product } from '../../models/product.model';
import { Observable, Subscription } from 'rxjs';
import { BaseService } from '../../services/base.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product: Product = new Product();
  isLoading: boolean = false;
  searchStr: string = ""
  categories: any[] = []
  error: string = '';
  productsStoreSub!: Subscription;
  constructor(private store: Store<fromApp.AppState>, private router: Router, private config: ConfigService) {}

  ngOnInit(): void {
    this.init();
    this.fadeIn();
  }

  init() {
    this.getCategories()
    this.productsStoreSub = this.store
      .select('products')
      .subscribe((productsState) => {
        this.products = productsState.products;
        this.isLoading = productsState.loading;
        this.error = productsState.error;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
    if (!this.products.length)
      this.store.dispatch(ProductsActions.getProduct());
  }

  fadeIn() {
    const products = document.getElementsByClassName('products');
    let index = 0;
    const interval = setInterval(() => {
      if (index < products.length) {
        products[index].classList.add('fade-in');
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }

  getCategories() {
   this.categories = this.config.getCategories()
  }

  showErrorAlert(error: string = this.error) {
    return error;
  }

  editModeOn(prod: Product) {
    document.querySelector('.mainContainer')?.classList.add('fade');
    this.store.dispatch(ProductsActions.editModeOn(prod));
  }

  clearError() {
    this.store.dispatch(ProductsActions.clearError());
  }

  deleteProduct(prod: Product) {
    this.store.dispatch(ProductsActions.deleteProduct(prod));
  }

  ngOnDestroy(): void {
    if (this.productsStoreSub) this.productsStoreSub.unsubscribe();
  }
}
