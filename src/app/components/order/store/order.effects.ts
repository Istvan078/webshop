import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as OrderActions from './order.actions';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Order } from '../../../models/order.model';

@Injectable()
export class OrderEffects {
  ordersRef: AngularFireList<Order>;
  constructor(
    private rTDatabase: AngularFireDatabase,
    private $actions: Actions
  ) {
    this.ordersRef = rTDatabase.list('orders');
  }

  getOrders(action: any) {
    let arr: Order[] = [];
    return this.ordersRef.query
      .once('value', (val) => {
        const obj = { ...val.val() };
        Object.entries(obj).forEach((val: any, i: number) => {
            console.log(val)
            console.log(i)
        //   const newOrder = new Order();
        //   newOrder.key = val[0];
        //   newOrder._deliveryType = val[1].name;
        //   newOrder.description = val[1].description;
        //   newOrder.price = val[1].price;
        //   newOrder.available = val[1].available;
        //   newOrder.photoUrl = val[1].photoUrl
        //   newOrder.number = i;
        //   if(val[1].subcategory?.key)
        //   newOrder.subcategory = val[1].subcategory
        //   newOrder.featured = val[1].featured
        //   newOrder.discount = val[1].discount
          // return arr.push({ ...val[1], key: val[0] });
          return arr.push(val[1]);
        });
        console.log(arr);
      })
      .then(() => action({ payload: arr }))
      .catch((err) => {
        throw of(err);
      });
  }

  $getOrders = createEffect(() => {
    return this.$actions.pipe(
      ofType(OrderActions.GET_ORDERS),
      switchMap(() => 
        this.getOrders(OrderActions.getOrdersSuccess)
        //   catchError((err) => of({ err }))
      )
    );
  });

  $addOrder = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(OrderActions.ADD_ORDER),
        tap((data) => {
          console.log(data);
          this.ordersRef.push(data);
        })
      );
    },
    { dispatch: false }
  );
}
