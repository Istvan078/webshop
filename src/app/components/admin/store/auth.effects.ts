import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from '@angular/fire/app';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Observable, catchError, map, of, switchMap, take, tap } from 'rxjs';
import { User, getAuth } from '@angular/fire/auth';
import { Environments } from '../../../environments';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

@Injectable()
export class AuthEffects {
  user!: User | any;
  getAuth = getAuth(initializeApp(Environments.firebaseConfig));
  httpHeaders: HttpHeaders = new HttpHeaders();
  defaultClaims: {} = { basic: true, admin: false, superAdmin: false };
  usersApiUrl = 'https://us-central1-webshop0781.cloudfunctions.net/api/';
  constructor(
    private auth: AngularFireAuth,
    private $actions: Actions,
    private router: Router,
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.auth.authState.subscribe((user) => (this.user = user));
  }

  $registerUser = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActions.registerUser),
      switchMap(async (action) => {
        const userCreated = await this.createUserWithEmAndPa(
          action.payload.email,
          action.payload.password
        );
        console.log('****SIKERES REGISZTRÁCIÓ****');
        this.router.navigate(['']);
        return AuthActions.userRegisteredSuccessfully({ payload: userCreated });
      })
    );
  });

  $login = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActions.login),
      map((action: any) => action.payload),
      switchMap(async (payload) => {
        try {
          const { user } = await this.auth.signInWithEmailAndPassword(
            payload.email,
            payload.password
          );
          //   if (!user?.emailVerified) {
          //     const emailVerificationSent = await user?.sendEmailVerification();
          //     this.auth.signOut();
          //     console.log('**** MEGERŐSÍTŐ E-MAIL ELKÜLDVE ****');
          //     return AuthActions.loginFailed();
          //   }
          if (user) {
            this.user = user;
            return AuthActions.userAuthentication({ payload: user });
          }
          return of({});
        } catch (err) {
          const errorMessage =
            'Túl sok megerősítő e-mail lett elküldve, próbáld újra később!';
          console.log(this.newError(errorMessage));
          return AuthActions.loginFailed();
        }
      })
    );
  });

  $userAuthentication = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActions.userAuthentication),
      switchMap(async () => {
        await this.getIdToken(this.user);
        console.log(this.user);
        return AuthActions.userAuthenticationSuccess({ payload: this.user });
      })
    );
  });

  $getAuthState = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActions.getAuthState),
      switchMap(() => {
        return this.auth.authState.pipe(
          take(1),
          map((user) => AuthActions.getAuthStateSuccess({ payload: user }))
          // catchError(error => of(AuthActions.getAuthStateFailure({ error })))
        );
      })
    );
  });

  $getUsers = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActions.getUsers),
      switchMap(() => {
        return this.getUsers().pipe(
          take(1),
          map((users) => {
            return AuthActions.getUsersSuccess({ payload: users });
          })
        );
      })
    );
  });

  $getClaims = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActions.getAuthStateSuccess),
      switchMap((action) => {
        console.log(action);
        return this.getClaims().pipe(
          take(1),
          map((claims) => {
            return AuthActions.getClaimsSuccess({ payload: claims });
          })
        );
      })
    );
  });

  $setClaims = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActions.setClaims),
      switchMap(async (action) => {
        await this.setCustomClaims(action.payload.uid, action.payload.claims);
        return AuthActions.getClaims();
      })
    );
  });

  $signOut = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(AuthActions.signOut),
        switchMap(async () => {
          const signOut = await this.auth.signOut();
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  async getIdToken(user: User) {
    const idToken = await this.getUserIdToken();
    this.user = { ...user };
    this.user.uid = user.uid;
    this.user.idToken = idToken;
    this.httpHeaders = this.httpHeaders.set('Authorization', this.user.idToken);

    this.getClaims().subscribe((claims: any) => {
      if (claims) {
        this.user.claims = claims;
        this.user.claims.admin
          ? this.router.navigate(['/admin'])
          : this.router.navigate(['']);
      } else {
        if (this.user.uid) {
          this.setCustomClaims(this.user.uid, this.defaultClaims);
          this.router.navigate(['']);
        }
      }
    });
  }

  async getUserIdToken() {
    const idToken = !this.user?.idToken
      ? await this.user?.getIdToken()
      : this.user?.idToken;
    return idToken;
  }

  async setCustomClaims(uid: string, claims: any) {
    const body = { uid, claims };
    const idToken = await this.getUserIdToken();
    this.user.idToken = idToken;
    this.httpHeaders = this.httpHeaders.set('Authorization', this.user.idToken);
    this.http
      .post(this.usersApiUrl + 'setCustomClaims', body, {
        headers: this.httpHeaders,
      })
      .subscribe({
        next: () => console.log('**** CLAIMS BEÁLLÍTÁSA SIKERES ****'),
      });
  }

  getClaims() {
    return new Observable((observer) => {
      this.getUserIdToken()
        .then((idToken) => {
          if (this.user) {
            this.user.idToken = idToken;
            this.httpHeaders = this.httpHeaders.set(
              'Authorization',
              this.user.idToken
            );
            this.http
              .get(this.usersApiUrl + `users/${this.user.uid}/claims`, {
                headers: this.httpHeaders,
              })
              .subscribe(
                (response) => {
                  observer.next(response); // Az érték továbbítása
                  observer.complete(); // A folyamat befejezése
                },
                (error) => {
                  observer.error(error); // Hiba esetén hibajelzés
                }
              );
          }
        })
        .catch((err) => observer.error(err)); // Hiba esetén hibajelzés
    });
  }

  newError(message: string) {
    return new Error(message).message;
  }

  getUsers(): Observable<[]> {
    if (this.user?.idToken) {
      // let headers = new HttpHeaders().set('Authorization', this.user.idToken);
      return this.http.get<[]>(this.usersApiUrl + 'users', {
        headers: this.httpHeaders,
      });
    }
    return of([]);
  }

  async createUserWithEmAndPa(email: string, password: string) {
    const userCred = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await userCred.user?.sendEmailVerification();
    console.log('**** MEGERŐSÍTŐ E-MAIL ELKÜLDVE ****');
    return userCred.user;
    // const signOut = await this.auth.signOut();
    // this.router.navigate(['']);
  }
}
