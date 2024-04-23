import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  getAuth,
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor(private aFireAuth: AngularFireAuth, private http: HttpClient) {}

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.aFireAuth.user.subscribe(
        (user: any) => {
          resolve(user);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  signInWithGoogle() {
    return this.aFireAuth.signInWithPopup(new GoogleAuthProvider());
  }

  signInWithPhoneNumber(phoneNumber: string) {
    return this.aFireAuth.signInWithPhoneNumber(
      phoneNumber,
      new RecaptchaVerifier(getAuth(), 'reCaptchaContainer', {})
    );
  }

  verifyPhoneNumberAndSignIN(credential: any) {
    return this.aFireAuth.signInWithCredential(credential);
  }
}
