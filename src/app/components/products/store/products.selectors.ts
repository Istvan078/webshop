import { createSelector } from "@ngrx/store"
import { AppState } from "../../../store/app.reducer"
import * as ProductsReducer from "./products.reducer"

const  selectProductsState = (state: AppState) => state.products

export const selectProducts = createSelector(
    selectProductsState,
    (state: ProductsReducer.State) => state.products
)
