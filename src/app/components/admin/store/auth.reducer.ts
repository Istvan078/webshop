import { createReducer, on } from "@ngrx/store";
import { CustomUser, Login } from "../../../models/auth.model";
import * as AuthActions from "./auth.actions"
import { User } from "@angular/fire/auth";

export interface State {
    userLoginDetails: Login
    user?: User & CustomUser
}

export const initialState: State = {
    userLoginDetails: {
        email: "",
        password: ""
    },
    user: undefined
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.userRegisteredSuccessfully, (state, action) => {
        return {...state, user: action.payload}
    }),
    on(AuthActions.login, (state, action) => {
        return {...state, userLoginDetails: action.payload}
    }),
    on(AuthActions.getAuthState, (state) => {
        return {...state, user: state.user}
    }),
    on(AuthActions.getAuthStateSuccess, (state, action) => {
        return {...state, user: action.payload}
    }),
    on(AuthActions.signOut, (state) => {
        return {...state, userLoginDetails: initialState.userLoginDetails, user: undefined}
    }),
    on(AuthActions.userAuthentication, (state, action) => {
        return {...state, user: action.payload}
    }),
    on(AuthActions.userAuthenticationSuccess, (state, action) => {   
        state.user!.idToken = action.payload.idToken
        return {...state, user: state.user}
    }),
    on(AuthActions.setClaims, (state, action) => {
        state.user!.claims = action.payload
        return {...state, user: state.user}
    }),
    on(AuthActions.getClaims, (state) => {
        return {...state, user: state.user}
    }),
    on(AuthActions.getClaimsSuccess, (state, action) => {
        state.user!.claims = action.payload
        return {...state, user: state.user}
    }),
)