import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as AuthActions from '../store/auth.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  phoneNumber: any;
  verificationCode: any;
  verificationId: any;
  emailOrGoogle: boolean = false;
  facebookOrGoogle: boolean = false;
  isPhone: boolean = false;
  reCapthcaOff: boolean = false;
  userProfiles: any[] = [];
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private store: Store) {}

  loginWithEmAndPa() {
    this.store.dispatch(AuthActions.login({payload: this.loginForm.value}))
  }

  // loginWithGoogle(): void {
  //   this.authService.signInWithGoogle().then(() => {
  //     this.authService.isLoggedIn().subscribe((user: any) => {
  //       if (user) {
  //         this.base.getUserProfiles().subscribe((userProfiles: any) => {
  //           this.userProfiles = userProfiles;

  //           let userProfile = this.userProfiles.filter(
  //             (userProfile: any) => userProfile.uid === user.uid
  //           );

  //           if (userProfile.length === 0) {
  //             userProfile.push(user);
  //             for (let i = 0; i < 1; i++) {
  //               this.base.addUserData({
  //                 uid: userProfile[0].uid,
  //                 email: user.email,
  //               });
  //             }
  //           }
  //           if (
  //             userProfile[0].birthDate === undefined ||
  //             userProfile[0].birthDate === ''
  //           ) {
  //             this.router.navigate(['profile/' + user.uid]);
  //           } else {
  //             this.router.navigate(['chat']);
  //           }
  //         });
  //       }
  //     });
  //   });
  // }

  // booleanFunction() {
  //   this.emailOrGoogle = !this.emailOrGoogle;
  // }

  // startLoginWithPhoneNumber() {
  //   this.authService
  //     .signInWithPhoneNumber('+36' + this.phoneNumber)
  //     .then((result) => {
  //       this.verificationId = result.verificationId;
  //       this.reCapthcaOff = true;
  //     });
  // }

  // verifyPhoneNumberAndLogin() {
  //   const credentials = PhoneAuthProvider.credential(
  //     this.verificationId,
  //     this.verificationCode
  //   );
  //   this.authService.verifyPhoneNumberAndSignIN(credentials).then(() => {
  //     this.authService.isLoggedIn().subscribe((user: any) => {
  //       this.base.getUserProfiles().subscribe((userProfiles: any[]) => {
  //         let userProfile = userProfiles.filter(
  //           (userProfile: UserClass) => userProfile.uid === user.uid
  //         );
  //         if (userProfile.length === 0) {
  //           userProfile.push(user);
  //           this.base.addUserData({
  //             uid: user.uid,
  //             phoneNumber: user.phoneNumber,
  //           });
  //         }
  //         if (
  //           userProfile[0]['birthDate'] === undefined ||
  //           userProfile[0]['birthDate'] === ''
  //         ) {
  //           this.router.navigate(['profile/' + user.uid]);
  //         } else {
  //           this.router.navigate(['chat']);
  //         }
  //       });
  //     });
  //   });
  // }

  // fillSignInValues() {
  //   this.loginForm.form.patchValue({
  //     email: 'pelda078@gmail.com',
  //     password: 'xy',
  //   });
  // }
}
