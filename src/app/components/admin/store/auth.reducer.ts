import { createReducer, on } from '@ngrx/store';
import { CustomUser, Login } from '../../../models/auth.model';
import * as AuthActions from './auth.actions';
import { User } from '@angular/fire/auth';

export interface State {
  userLoginDetails: Login;
  user?: User & CustomUser;
  users: (User[] & CustomUser[]) | any[];
}

export const initialState: State = {
  userLoginDetails: {
    email: '',
    password: '',
  },
  user: undefined,
  users: [],
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.userRegisteredSuccessfully, (state, action) => {
    return { ...state, user: action.payload };
  }),
  on(AuthActions.login, (state, action) => {
    return { ...state, userLoginDetails: action.payload };
  }),
  on(AuthActions.getAuthState, (state) => {
    return { ...state, user: state.user };
  }),
  on(AuthActions.getAuthStateSuccess, (state, action) => {
    return { ...state, user: action.payload };
  }),
  on(AuthActions.signOut, (state) => {
    return {
      ...state,
      userLoginDetails: initialState.userLoginDetails,
      user: undefined,
    };
  }),
  on(AuthActions.userAuthentication, (state, action) => {
    return { ...state, user: action.payload };
  }),
  on(AuthActions.userAuthenticationSuccess, (state, action) => {
    state.user!.idToken = action.payload.idToken;
    return { ...state, user: state.user };
  }),
  on(AuthActions.getUsersSuccess, (state, action) => {
    return { ...state, users: action.payload };
  }),
  on(AuthActions.setClaims, (state, action) => {
    // let index = 0;
    const changedClaimsUsers = state.users
      //   .filter((user, i) => {
      //     index = i
      //    return user.uid === action.payload.uid
      // })
      .map((user) => {
        if (user.uid === action.payload.uid)
          user.claims = action.payload.claims;
        return user;
      });
    // const noClaimsChangedUsers = state.users.filter(
    //   (user) => user.uid !== action.payload.uid
    // );
    // const noClaimsChangedUsers = state.users.splice(index, 1);
    // const allUsers = [...noClaimsChangedUsers, ...changedClaimsUsers];
    return { ...state, users: changedClaimsUsers };
  }),
  on(AuthActions.getClaims, (state) => {
    return { ...state, user: state.user };
  }),
  on(AuthActions.getClaimsSuccess, (state, action) => {
    state.user!.claims = action.payload;
    return { ...state, user: state.user };
  })
);
