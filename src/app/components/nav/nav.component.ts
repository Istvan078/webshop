import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../admin/store/auth.actions';
import { Subscription } from 'rxjs';
import { CustomUser, Login } from '../../models/auth.model';
import { User } from 'firebase/auth';
import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  animations: [
    trigger('mobileNavState', [
      state(
        'normal',
        style({
          transform: 'translateX(-100px)',
        })
      ),
      state(
        'transformed',
        style({
          transform: 'translateX(10px)',
        })
      ),
      transition('normal => transformed', animate(1000)),
    ]),
    trigger('navItemsState', [
      state(
        'normal',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'navITransformed',
        style({
          transform: 'translateX(20px)',
        })
      ),
      transition('normal => navITransformed', animate(300)),
    ]),
  ],
})
export class NavComponent implements OnInit, OnDestroy {
  numberOfProds: number = 0;
  userLoginDetails: Login = new Login();
  authSub!: Subscription;
  user?: User & CustomUser;
  isMobileNav: boolean = false;

  state = 'normal';
  navItemsState = 'normal';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.isLoggedIn();
    this.getAuthState();
    this.getClaims();
    this.store.select('products').subscribe((state) => {
      this.numberOfProds = state.basket.length;
    });
  }

  isLoggedIn() {
    this.authSub = this.store.select('auth').subscribe((state) => {
      this.userLoginDetails = state.userLoginDetails;
      this.user = state.user;
    });
  }

  mobileNavOn() {
    this.isMobileNav = !this.isMobileNav;

    setTimeout(() => {
      const mobNavContainer = document.querySelector('.mobile-nav-container');
      const mobNavItems = document.querySelectorAll('.mobile-nav-container a');
      mobNavContainer?.addEventListener('click', (e: any) => {
        e.target.style.transform = 'translateX(30px)';
        e.target.style.width = '75%';
        mobNavItems.forEach((item: any, i) => {
          item.setAttribute('data-navItem', i);
          if (i !== +e.target.dataset.navitem) {
            item.style.transform = 'translateX(0)';
            item.style.color = 'black';
          } else item.style.color = 'white';
        });
      });
      this.state === 'normal'
        ? (this.state = 'transformed')
        : (this.state = 'normal');
      this.navItemsState === 'normal'
        ? (this.navItemsState = 'navITransformed')
        : (this.navItemsState = 'normal');
    }, 200);
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut());
  }

  getAuthState() {
    this.store.dispatch(AuthActions.getAuthState());
  }

  getClaims() {
    this.store.dispatch(AuthActions.getClaims());
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
