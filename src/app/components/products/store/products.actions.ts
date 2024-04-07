import { Action, createAction, props } from '@ngrx/store';
import { Product } from '../../../models/product.model';

export const ADD_PRODUCT = '[Products] Add Product';
export const ADD_PRODUCT_SUCCESS = '[Products] Add Product Success';

export const DELETE_PRODUCT = '[Products] Delete Product';
export const DELETE_PRODUCT_SUCCESS = '[Products] Delete Product Success';

export const EDIT_MODE_ON = '[Products] Edit Product';

export const UPDATE_PRODUCT = '[Products] Update Product';
export const UPDATE_PRODUCT_SUCCESS = '[Products] Update Product Success';

export const GET_PRODUCT = '[Products] Get Products';
export const GET_PRODUCT_SUCCESS = '[Products] Get Products Success';
export const GET_PRODUCTS_FAIL = '[Products] Get Products Fail';

export const CLEAR_ERROR = '[Products] Clear Error';

export const AddProduct = createAction(
  ADD_PRODUCT,
  props<{ product: Product }>()
);
export const AddProductSuccess = createAction(
  ADD_PRODUCT_SUCCESS,
  props<{ products: Product[] }>()
);

export const updateProduct = createAction(
  UPDATE_PRODUCT,
  props<{ product: Product }>()
);

export const getProduct = createAction(GET_PRODUCT);
export const GetProductSuccess = createAction(
  GET_PRODUCT_SUCCESS,
  props<{ products: Product[] }>()
);
export const GetProductsFail = createAction(
  GET_PRODUCTS_FAIL,
  props<{ payload: string }>()
);

export const editModeOn = createAction(EDIT_MODE_ON, props<Product>())

export const deleteProduct = createAction(DELETE_PRODUCT, props<Product>());
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS);

export const clearError = createAction(CLEAR_ERROR);

// export class GetProductsFail implements Action {
//     readonly type: string = GET_PRODUCTS_FAIL;

//     constructor(public payload: string) {}
// }
