import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../products/store/products.actions';
import * as fromApp from '../../store/app.reducer';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import deepmerge from 'deepmerge';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy, OnInit {
  products: Product[] = [];
  product: Product = new Product();
  isLoading: boolean = false;
  searchStr: string = '';
  categories: any[] = [];
  error: string = '';
  productsStoreSub!: Subscription;
  isSearchOn: boolean = false;
  filteredProducts: Product[] = [];
  isPutToBasket: boolean = false;
  filteredFeaturedProducts: Product[] = [];
  shownFeaturedProducts: Product[] = [];
  index: number = 0;
  isLeftArrow: boolean = false;
  isRightArrow: boolean = true;
  icons: any[] = [
    { key: 'firstCategory', value: 'bi-brush' },
    { key: 'secondCategory', value: 'bi-laptop' },
    { key: 'thirdCategory', value: 'bi-tree' },
    { key: 'fourthCategory', value: 'bi-house' },
    { key: 'fifthCategory', value: 'bi-hammer' },
  ];
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private config: ConfigService,
    private base: BaseService
  ) {}

  async ngOnInit() {
    const productsArrSet = await this.init();
    console.log(productsArrSet);
    this.filterFeaturedProducts();
    this.fadeIn();
  }

  init() {
    this.getCategories();
    return new Promise((res) => {
      this.productsStoreSub = this.store
        .select('products')
        .subscribe((productsState) => {
          console.log(productsState.basket);
          if (productsState.products.length) {
            this.products = productsState.products;
            res('****TERMEKEK TOMB BEALLITVA****');
          }

          this.isLoading = productsState.loading;
          this.error = productsState.error;
          if (this.error) {
            this.showErrorAlert(this.error);
          }
        });
      if (!this.products.length)
        this.store.dispatch(ProductsActions.getProduct());
    });
  }

  changeToDarkMode() {
    document.body.style.background = 'rgba(0, 0, 0, 0.8)'
    const inputs = document.querySelectorAll('input')
    inputs.forEach((inp) => inp.style.color = 'white')
    this.base.colorModesSubject.next(true)
  }

  changeToLightMode() {
    const pageColor = getComputedStyle(document.documentElement).getPropertyValue('--page-color')
    document.body.style.background = pageColor
    document.body.style.color = ''
    const inputs = document.querySelectorAll('input')
    inputs.forEach((inp) => inp.style.color = '')
    this.base.colorModesSubject.next(false)
  }

  fadeIn() {
    const products = document.getElementsByClassName('products');
    let index = 0;
    const interval = setInterval(() => {
      if (index < products.length) {
        products[1]?.classList.remove('full-opacity');
        products[index].classList.add('fade-in');
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }

  fadeInOnClick() {
    const products = document.getElementsByClassName('products');
    let index = 3;
    const interval = setInterval(() => {
      if (index === products.length) {
        products[0].classList.add('full-opacity');
        products[1].classList.add('full-opacity');

        // if(!products[0].classList.contains('fade-in'))
        //   products[0].classList.add('fade-in')
        // if(!products[1].classList.contains('fade-in'))
        //   products[1].classList.add('fade-in')
        products[index - 1].classList.add('fade-in');
        index++;
      } else {
        if (!products[0].classList.contains('fade-in'))
          products[0].classList.add('fade-in');
        if (!products[1].classList.contains('fade-in'))
          products[1].classList.add('fade-in');
        products[0].classList.remove('full-opacity');
        products[1].classList.remove('full-opacity');
        clearInterval(interval);
      }
    }, 500);
  }

  getCategories() {
    this.categories = this.config.getCategories();
  }

  searchProduct() {
    this.isSearchOn = true;
    this.filteredProducts = this.products.filter(
      (prod) =>
        prod.name.toLowerCase().includes(this.searchStr.toLowerCase()) ||
        prod.description.toLowerCase().includes(this.searchStr.toLowerCase())
    );
    this.fadeIn();
  }

  filterFeaturedProducts() {
    this.filteredFeaturedProducts = this.products.filter(
      (prod) => prod.featured === true
    );
    if (window.innerWidth > 500)
      this.shownFeaturedProducts = this.filteredFeaturedProducts.slice(0, 3);
    else this.shownFeaturedProducts = this.filteredFeaturedProducts.slice(0, 1);
    this.shownFeaturedProducts = deepmerge(this.shownFeaturedProducts, []);
    this.filteredFeaturedProducts = deepmerge(
      this.filteredFeaturedProducts,
      []
    );
  }

  toLeft() {
    if (this.index > 0 && window.innerWidth > 500) {
      this.isRightArrow = true;
      this.index--;
      this.shownFeaturedProducts = this.filteredFeaturedProducts.slice(
        this.index,
        this.index + 3
      );
      this.fadeIn();
    } else {
      this.isRightArrow = true;
      this.index--;
      this.shownFeaturedProducts = this.filteredFeaturedProducts.slice(
        this.index,
        this.index + 1
      );
      this.fadeIn();
    }
    if (this.index <= 0) {
      this.isLeftArrow = false;
    }
  }

  toRight() {
    if (
      this.index < this.filteredFeaturedProducts.length - 3 &&
      window.innerWidth > 500
    ) {
      this.isLeftArrow = true;
      this.index++;
      if (this.index >= this.filteredFeaturedProducts.length - 3)
        this.isRightArrow = false;
      this.shownFeaturedProducts = this.filteredFeaturedProducts.slice(
        this.index,
        this.index + 3
      );
      this.fadeInOnClick();
    } else {
      this.isLeftArrow = true;
      this.index++;
      if (this.index >= this.filteredFeaturedProducts.length - 1)
        this.isRightArrow = false;
      this.shownFeaturedProducts = this.filteredFeaturedProducts.slice(
        this.index,
        this.index + 1
      );
      this.fadeIn();
    }
  }

  toBasket(product: Product) {
    this.isPutToBasket = true;
    this.product = product;
    document.addEventListener('keydown', (e) => {
      console.log(e, 'gombnyomas tortent');
      if (e.key === 'Escape') this.isPutToBasket = false;
    });
    this.store.dispatch(ProductsActions.addToBasket(product));
  }

  showErrorAlert(error: string = this.error) {
    return error;
  }

  clearError() {
    this.store.dispatch(ProductsActions.clearError());
  }

  ngOnDestroy(): void {
    if (this.productsStoreSub) this.productsStoreSub.unsubscribe();
  }
}
