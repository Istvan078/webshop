import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/sub-categories/products/products.component';
import { AdminComponent } from './components/admin/admin.component';
import { SubCategoriesComponent } from './components/products/sub-categories/sub-categories.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products-edit', component: AdminComponent },
  { path: 'subcategories', component: SubCategoriesComponent },
  { path: 'subcategories/:cat', component: SubCategoriesComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
