import { ActionReducerMap } from '@ngrx/store'
import * as ProductsReducer from '../components/products/store/products.reducer'
import * as OrderReducer from '../components/order/store/order.reducer'
import * as AuthReducer from '../components/admin/store/auth.reducer'

export interface AppState {
    products: ProductsReducer.State;
    orders: OrderReducer.State;
    auth: AuthReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    products: ProductsReducer.productsReducer,
    orders: OrderReducer.orderReducer,
    auth: AuthReducer.authReducer
}