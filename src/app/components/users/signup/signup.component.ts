import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as AuthActions from '../../admin/store/auth.actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {

  emailOrGoogle: any;
  constructor(private store: Store<AppState>) {}
  signUpWithEmAndPa(signupForm: NgForm) {
    this.store.dispatch(AuthActions.registerUser({payload: signupForm.value}))
  }
}
