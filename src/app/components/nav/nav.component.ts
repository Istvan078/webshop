import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../admin/store/auth.actions'
import { Subscription } from 'rxjs';
import { CustomUser, Login } from '../../models/auth.model';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})

export class NavComponent implements OnInit, OnDestroy {
  numberOfProds: number = 0;
  userLoginDetails: Login = new Login();
  authSub!: Subscription;
  user?: User & CustomUser

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
    this.getAuthState();

      
      this.getClaims();

    this.store.select('products').subscribe((state) => {
      this.numberOfProds = state.basket.length;
    });
  }

  isLoggedIn() {
    this.authSub = this.store.select('auth').subscribe(
      (state) => {
        this.userLoginDetails = state.userLoginDetails
         this.user = state.user
        console.log(this.user)       
      }
    )
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut())
  }

  getAuthState() {
    this.store.dispatch(AuthActions.getAuthState())
  }

  getClaims() {
    this.store.dispatch(AuthActions.getClaims())
  }

  ngOnDestroy(): void {
    if(this.authSub) this.authSub.unsubscribe()
  }
}
