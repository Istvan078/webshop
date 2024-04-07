import { ActionReducerMap } from '@ngrx/store'
import * as ProductsReducer from '../components/products/store/products.reducer'

export interface AppState {
    products: ProductsReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    products: ProductsReducer.productsReducer
}