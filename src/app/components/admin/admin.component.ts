import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../products/store/products.actions';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, AfterViewInit {
  product: Product = new Product();
  isEditMode: boolean = false;
  subcategories: any = {};
  categories: any[] = [];
  @ViewChild('catOption', { static: false }) catOption!: ElementRef;
  catKey: string = '';

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.subcategories = this.config.getSubCategories();
    this.categories = this.config.getCategories();
    this.route.queryParams.subscribe((data: any) => {
      if (data.name) {
        this.isEditMode = true;
        this.product = { ...data };
        this.product.price = +data.price;
        this.product.available = +data.quantity;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.catKey = this.catOption.nativeElement.value;
    }, 1000);
  }

  selectedCat(event: any) {
    this.catKey = event.target.value;
  }

  selectedSubCat(event: any) {
    // subcategories[catKey].value[i]
    (this.product.subcategory as any) = {
      key: this.catKey,
      queryPar: event.target.value,
    };
    console.log(this.product);
  }

  async setTimeout(sec: number) {
    return new Promise((res) => {
      setTimeout(() => {
        res('');
      }, sec * 1000);
    });
  }

  async addProduct() {
    document.querySelector('.mainContainer')?.classList.add('fade');
    await this.setTimeout(1);
    this.store.dispatch(ProductsActions.AddProduct({ product: this.product }));
    // this.product = new Product();
  }

  async updateProduct() {
    document.querySelector('.mainContainer')?.classList.add('fade');
    await this.setTimeout(1);
    // console.log(this.product)
    this.store.dispatch(
      ProductsActions.updateProduct({ product: this.product })
    );
  }
}
