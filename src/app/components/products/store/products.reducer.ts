import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../models/product.model';
import * as ProductsActions from './products.actions';

export interface State {
  products: Product[];
  error: string,
  loading: boolean
}

const initialState: State = {
  products: [
    // new Product(1000, 'xyz', 'Alapértelmezett termék', 'Példa Termék', 10),
  ],
  error: "",
  loading: false
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.getProduct, (state) => {
    console.log('TERMÉKEK LEKÉRÉSE ELINDÍTVA')
    return {...state, loading: true}
  }),
  on(ProductsActions.GetProductsFail, (state, action) => {
    return {...state, loading: false, products: [], error: action.payload}
  }),
  on(ProductsActions.GetProductSuccess, (state, action) => {
    console.log([...state.products, ...action.products])
    console.log("Sikeres lekérés")
    return { ...state, loading: false, error: "", products: [...state.products, ...action.products]}
  }),
  on(ProductsActions.AddProduct, (state, action) => {
    console.log(`termék hozz. elkezdődött`);
    return { ...state, products: [...state.products, action.product] };
  }),
  on(ProductsActions.AddProductSuccess, (state, action) => {
    console.log(state)
    return {...state, error: "", products: [...action.products]}
  }),
  on(ProductsActions.deleteProduct, (state, action) => {
    console.log(`törlés elkezdődött`);
    return { ...state,  products: [...state.products.filter(prod => prod.key !== action.key)]};
  }),
  on(ProductsActions.deleteProductSuccess, (state) => {
    console.log(state)
    console.log("SIKERES TÖRLÉS");
    return {...state, error: "" } 
  })
);
