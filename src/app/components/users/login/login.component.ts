import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as AuthActions from '../../admin/store/auth.actions'
import { Login } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
emailOrGoogle: any;
constructor(private store: Store<AppState>) {}

loginWithEmAndPa(loginFormValue: Login) {
  this.store.dispatch(AuthActions.login({payload: loginFormValue}))
}
}
