import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { CategoriesManagerComponent } from './pages/categories-manager/categories-manager.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsManagerComponent } from './pages/products-manager/products-manager.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product', component: ProductsManagerComponent },
      { path: 'product/:id', component: ProductsManagerComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'category', component: CategoriesManagerComponent },
      { path: 'category/:id', component: CategoriesManagerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
