import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../../models/product.model';
import * as ProductsActions from './products.actions';

export interface State {
  products: Product[];
  basket: Product[];
  error: string;
  loading: boolean;
}

const initialState: State = {
  products: [],
  basket: [],
  error: '',
  loading: false,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.getProduct, (state) => {
    console.log('TERMÉKEK LEKÉRÉSE ELINDÍTVA');
    return { ...state, loading: true };
  }),
  on(ProductsActions.GetProductsFail, (state, action) => {
    return { ...state, loading: false, products: [], error: action.payload };
  }),
  on(ProductsActions.GetProductSuccess, (state, action) => {
    console.log([...state.products, ...action.products]);
    console.log('Sikeres termékek lekérés');
    return {
      ...state,
      loading: false,
      error: '',
      products: [...action.products],
    };
  }),
  on(ProductsActions.AddProduct, (state, action) => {
    console.log(`termék hozz. elkezdődött`);
    const copy = { ...action.product };
    return { ...state, products: [...state.products, copy] };
  }),
  on(ProductsActions.AddProductSuccess, (state, action) => {
    console.log(state);
    return { ...state, error: '', products: [...action.products] };
  }),
  on(ProductsActions.editModeOn, (state) => {
    return { ...state };
  }),
  on(ProductsActions.updateProduct, (state, action) => {
    console.log('SIKERES UPDATE');
    // felülírja a régi értékeket az újjal
    // régi objekt értékek: ...state.products[action.ind]
    // új object értékek: ..action.product
    const updatedProduct = {
      ...state.products[action.product.number],
      ...action.product,
    };
    const updatedProducts = [...state.products];
    // a tömbben is módosítjuk a módosított objektumot
    updatedProducts[action.product.number] = updatedProduct;
    return { ...state, products: updatedProducts };
  }),
  on(ProductsActions.deleteProduct, (state, action) => {
    console.log(`törlés elkezdődött`);
    return {
      ...state,
      products: [...state.products.filter((prod) => prod.key !== action.key)],
    };
  }),
  on(ProductsActions.deleteProductSuccess, (state) => {
    console.log(state);
    console.log('SIKERES TÖRLÉS');
    return { ...state, error: '' };
  }),
  on(ProductsActions.addToBasket, (state, product) => {
    // const copy = { ...product };
    return { ...state, basket: [...state.basket, product] };
  }),
  on(ProductsActions.clearError, (state) => ({
    ...state,
    error: '',
    loading: false,
  }))
);

// export function productsReducer(state: State, action: Action) {
//   return _productsReducer(state, action)
// }
