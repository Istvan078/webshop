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

  getProducts(action: any) {
    let arr: Product[] = [];
    return this.productsRef.query
      .once('value', (val) => {
        const obj = { ...val.val() };
        Object.entries(obj).forEach((val: any, i: number) => {
          const newProduct = new Product();
          newProduct.key = val[0];
          newProduct.name = val[1].name;
          newProduct.description = val[1].description;
          newProduct.price = val[1].price;
          newProduct.quantity = val[1].quantity;
          newProduct.photoUrl = val[1].photoUrl
          newProduct.number = i;
          // return arr.push({ ...val[1], key: val[0] });
          return arr.push(newProduct);
        });
        console.log(arr);
      })
      .then(() => action({ products: arr }))
      .catch((err) => {
        throw of(err);
      });
  }

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.ADD_PRODUCT),
      switchMap((productData: any) => {
        const product = productData.product;
        this.productsRef.push(product);
        this.router.navigate(['products']);
        return this.getProducts(ProductActions.AddProductSuccess);
      })
    );
  });

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCT),
      switchMap((prods: any) => {
        console.log(prods);
        return this.getProducts(ProductActions.GetProductSuccess);
      }),
      catchError((error) => {
        error.message = 'Nincs engedélyed az adatok megtekintéséhez!';
        console.log(error);
        return of(ProductActions.GetProductsFail({ payload: error.message }));
      })
    );
  });

  editModeOn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.EDIT_MODE_ON),
      tap((prod:any) => {
        console.log(prod)
        setTimeout(() => {
          this.router.navigate([`products-edit`],{queryParams: prod})
        }, 1000);
      })
    )
  }, {dispatch: false})

  updateProduct$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.UPDATE_PRODUCT),
        tap((prod: any) => {
          console.log(prod.product)
          this.productsRef
            .update(prod.product.key, prod.product)
            .then(() => this.router.navigate(['products']));
        })
      );
    },
    { dispatch: false }
  );

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

  // getProductsSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(ofType(ProductActions.GET_PRODUCT), tap(
  //     () => {
  //       this.router.navigate([''])
  //     }
  //   ))
  // }, {dispatch: false})
}

// dispatch: false - nem futtat le új akciót a végén!
// map rxjs operator egy új observable-t ad vissza
// catchError nem ad vissza új observable-t, ezért sajátot kell csinálni benne
