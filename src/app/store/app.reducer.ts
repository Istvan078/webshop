import { ActionReducerMap } from '@ngrx/store'
import * as ProductsReducer from '../components/products/store/products.reducer'
import * as OrderReducer from '../components/order/store/order.reducer'

export interface AppState {
    products: ProductsReducer.State;
    orders: OrderReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    products: ProductsReducer.productsReducer,
    orders: OrderReducer.orderReducer
}