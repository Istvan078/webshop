import { Component } from '@angular/core';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.scss',
})
export class ClaimsComponent {
  claims: {
    basic: boolean;
    admin: boolean;
    superAdmin: boolean;
  } = {
    basic: true,
    admin: true,
    superAdmin: false,
  };
  constructor(private store: Store<AppState>) {}

  setClaims() {
    this.store.dispatch(AuthActions.setClaims({ payload: this.claims }));
  }
}
