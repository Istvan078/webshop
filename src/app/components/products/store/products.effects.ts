import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './products.actions';
import { catchError, of, switchMap, tap } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Product } from '../../../models/product.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {
  path: string = 'products';
  productsRef: AngularFireList<Product>;
  constructor(
    private actions$: Actions,
    private rTDatabase: AngularFireDatabase,
    private router: Router
  ) {
    this.productsRef = rTDatabase.list(this.path);
  }
  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.ADD_PRODUCT),
      switchMap((productData: any) => {
        const product = productData.product;
        this.productsRef.push(product).then(() => {});
        let arr: Product[] = [];
        return this.productsRef.query
          .once('value', (val) => {
            const obj = { ...val.val() };
            Object.entries(obj).forEach((val: any) => {
              return arr.push({ ...val[1], key: val[0] });
            });
            console.log(arr);
          })
          .then(() => ProductActions.AddProductSuccess({ products: arr }));
      })
    );
  });

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCT),
      switchMap((prods: any) => {
        console.log(prods);
        let arr: Product[] = [];
        return this.productsRef.query
          .once('value', (val) => {
            const obj = { ...val.val() };
            Object.entries(obj).forEach((val: any) => {
              return arr.push({ ...val[1], key: val[0] });
            });
            console.log(arr);
          })
          .then(() => ProductActions.GetProductSuccess({ products: arr }));
      }),
      catchError(error => {
        return of(ProductActions.GetProductsFail(error))
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.DELETE_PRODUCT),
      switchMap((prod: Product) => {
        console.log(prod);
        return this.productsRef
          .remove(prod.key)
          .then(() => ProductActions.deleteProductSuccess());
      })
    );
  });

  getProductsSuccess$ = createEffect(() => {
    return this.actions$.pipe(ofType(ProductActions.GET_PRODUCT), tap(
      () => {
        this.router.navigate([''])
      }
    ))
  }, {dispatch: false}) 
}

// dispatch: false - nem futtat le új akciót a végén!
// map rxjs operator egy új observable-t ad vissza
// catchError nem ad vissza új observable-t, ezért sajátot kell csinálni benne