import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, ProductsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
