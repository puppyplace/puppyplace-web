import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
