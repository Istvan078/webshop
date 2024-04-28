import { Component } from '@angular/core';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

import { HttpClient } from '@angular/common/http';
import { ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.scss',
})
export class ClaimsComponent implements OnInit, OnDestroy {
  claims: {
    basic: boolean;
    admin: boolean;
    superAdmin: boolean;
  } = {
    basic: true,
    admin: true,
    superAdmin: false,
  };

  authSub!: Subscription;

  isSideNavOn: boolean = false;
  isReadyToDeleteProf: boolean = false;
  userDisplayOn: boolean = false;
  user: any;
  columns: string[] = [
    'Megjelenítési név',
    'Profilkép',
    'Email-cím',
    'Jogosultságok',
  ];
  users: User[] | any = [];
  @ViewChild('saveChanges', { static: false }) saveChanges!: ElementRef;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.getUsers());
    this.authSub = this.store.select('auth').subscribe((state) => {
      console.log(state.user);
      this.user = state.user;
      this.users = state.users;
      console.log(state.users);
    });
  }

  setClaims(uid: string, claims: any) {
    this.store.dispatch(AuthActions.setClaims({ payload: { uid, claims } }));
  }

  // getLoggedInUser() {
  //   this.authService
  //     .getUserLoggedInSubject()
  //     .subscribe((u) => (this.loggedInUser = u));
  // }

  // getIndexOfUser(index: number) {
  //   this.user = this.users[index];
  // }

  // getUserProfiles() {
  //   this.base.getUserProfiles().subscribe((uPfs) => (this.userProfiles = uPfs));
  //   this.userProfiles.forEach((uP) => {
  //     if (!uP.age && uP.birthDate) {
  //       const uProf = new UserClass(uP.birthDate);
  //       uProf.ageCalc();
  //       const updatedAge = { age: uProf.age };
  //       this.base.updateUserData(updatedAge, uP.key);
  //       console.log(uProf);
  //     }
  //   });
  // }

  // removeUserProfile() {
  //   const selectedUser = this.userProfiles.find(
  //     (uP) => uP.uid === this.user.uid
  //   );
  //   if (selectedUser) this.base.removeUserProfile(selectedUser.key);
  // }

  // getUsers() {
  //   return this.http
  //     .get<UserClass[]>(this.usersApiUrl + 'users', {
  //       headers: this.authService.httpHeaders,
  //     })
  //     .subscribe((users) => (this.users = users));
  // }

  // setUserProfile() {
  //   this.http
  //     .post(this.usersApiUrl + 'setUserProfile', this.user)
  //     .subscribe((res) => {
  //       this.getUsers();
  //     });
  // }

  // sureToDeleteUser() {
  //   const actModal = this.modalRef.open(ModalComponent, {
  //     centered: true,
  //   });
  //   if (this.user.displayName) {
  //     actModal.componentInstance.userName = this.user.displayName;
  //   } else {
  //     actModal.componentInstance.userName = 'Névtelen felhasználó';
  //   }
  //   actModal.componentInstance.uid = this.user.uid;
  //   actModal.result
  //     .then(() => this.getUsers())
  //     .catch((err) => console.log(err));
  // }

  ngOnDestroy(): void {
    // this.authService.navDisappear.next(false);
    if (this.authSub) this.authSub.unsubscribe();
  }
}
