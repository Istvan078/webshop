import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/sub-categories/products/products.component';
import { AdminComponent } from './components/admin/admin.component';
import { SubCategoriesComponent } from './components/products/sub-categories/sub-categories.component';
import { OrderComponent } from './components/order/order.component';
import { SubmittedOrdersComponent } from './components/admin/submitted-orders/submitted-orders.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { LoginComponent } from './components/users/login/login.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { ClaimsComponent } from './components/admin/claims/claims.component';
import { MyOrdersComponent } from './components/users/my-orders/my-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products-edit', component: AdminComponent },
  { path: 'subcategories', component: SubCategoriesComponent },
  { path: 'subcategories/:cat', component: SubCategoriesComponent },
  { path: 'order', component: OrderComponent },
  { path: 'users/sign-up', component: SignupComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/my-orders', component: MyOrdersComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/claims', component: ClaimsComponent },
  { path: 'admin/orders', component: SubmittedOrdersComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
