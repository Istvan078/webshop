import { createAction, props } from '@ngrx/store';
import { CustomUser, Login } from '../../../models/auth.model';

const LOGIN = '[AUTH] Login';
const LOGIN_FAILED = '[AUTH] Login Failed';
const GET_AUTH_STATE = '[AUTH] Get Auth State';
const GET_AUTH_STATE_SUCCESS = '[AUTH] Get Auth State Success';
const SIGNOUT = '[AUTH] Signout';
const USER_AUTHENTICATION = '[AUTH] User Authentication';
const USER_AUTHENTICATION_SUCCESS = '[AUTH] User Authentication Success';
const REGISTER_USER = '[AUTH] User Registration';
const USER_REGISTERED_SUCCESSFULLY = '[AUTH] User Registration Successful';
const SET_CLAIMS = '[AUTH] Set Claims';
const GET_CLAIMS = '[AUTH] Get Claims';
const GET_CLAIMS_SUCCESS = '[AUTH] Get Claims Success';

export const registerUser = createAction(
  REGISTER_USER,
  props<{ payload: Login }>()
);
export const userRegisteredSuccessfully = createAction(
    USER_REGISTERED_SUCCESSFULLY,
    props<{ payload: any }>()
  );
export const login = createAction(LOGIN, props<{ payload: Login }>());
export const loginFailed = createAction(LOGIN_FAILED);
export const getAuthState = createAction(GET_AUTH_STATE);
export const getAuthStateSuccess = createAction(
  GET_AUTH_STATE_SUCCESS,
  props<{ payload: any }>()
);
export const userAuthentication = createAction(
  USER_AUTHENTICATION,
  props<{ payload: any }>()
);
export const userAuthenticationSuccess = createAction(
    USER_AUTHENTICATION_SUCCESS,
    props<{ payload: any }>()
  );
export const setClaims = createAction(SET_CLAIMS, props<{ payload: any }>());
export const getClaims = createAction(GET_CLAIMS);
export const getClaimsSuccess = createAction(
  GET_CLAIMS_SUCCESS,
  props<{ payload: any }>()
);
export const signOut = createAction(SIGNOUT);
