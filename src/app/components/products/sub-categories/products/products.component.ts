import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../../../products/store/products.actions';
import * as fromApp from '../../../../store/app.reducer';
import { Product } from '../../../../models/product.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnDestroy, OnInit {
  products: Product[] = [];
  product: Product = new Product();
  isLoading: boolean = false;
  searchStr: string = '';
  categories: any[] = [];
  error: string = '';
  productsStoreSub!: Subscription;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private config: ConfigService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const prodsFiltered = await this.init();
    console.log(prodsFiltered);
    this.fadeIn();
  }

  init() {
    this.getCategories();
    let queryParams: any = {};
    return new Promise((res) => {
      this.route.queryParams.subscribe((subcat: any) => {
        queryParams.queryPar = subcat.queryPar;
        this.productsStoreSub = this.store
          .select('products')
          .subscribe((productsState) => {
            this.isLoading = productsState.loading;
            if (queryParams.done) return;
            if (!queryParams.done || queryParams.queryPar === 'all-products')
              this.products = productsState.products;
            this.error = productsState.error;
            if (this.error) {
              this.showErrorAlert(this.error);
            }
            if (
              !queryParams.done &&
              this.products.length &&
              queryParams.queryPar !== 'all-products'
            ) {
              queryParams.done = true;
              if (queryParams.queryPar)
                this.products = this.products.filter(
                  (prod) => prod.subcategory.queryPar === queryParams.queryPar
                );
              res('**** TERMEKEK MEGSZURVE ****');
            } else if (this.products.length) {
              queryParams.done = true;
              res('**** TERMEKEK MEGSZURVE ****');
            }
            return [];
          });
        if (!this.products.length)
          this.store.dispatch(ProductsActions.getProduct());
      });
    });
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
    this.categories = this.config.getCategories();
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
