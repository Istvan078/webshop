import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/sub-categories/products/products.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { appReducer } from './store/app.reducer';
import { NavComponent } from './components/nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Environments } from './environments';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './components/products/store/products.effects';
import { AdminComponent } from './components/admin/admin.component';
import { SubCategoriesComponent } from './components/products/sub-categories/sub-categories.component';
import { OrderComponent } from './components/order/order.component';
import { SubmittedOrdersComponent } from './components/admin/submitted-orders/submitted-orders.component';
import { OrderEffects } from './components/order/store/order.effects';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthEffects } from './components/admin/store/auth.effects';
import { LoginComponent } from './components/users/login/login.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { ClaimsComponent } from './components/admin/claims/claims.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NavComponent,
    AdminComponent,
    SubCategoriesComponent,
    OrderComponent,
    SubmittedOrdersComponent,
    AdminLoginComponent,
    LoginComponent,
    SignupComponent,
    ClaimsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {
      runtimeChecks: { strictActionImmutability: false, strictStateImmutability: false },
    }),
    EffectsModule.forRoot([ProductsEffects, OrderEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: Environments.production }),
    StoreRouterConnectingModule.forRoot(),
    AngularFireModule.initializeApp(Environments.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
