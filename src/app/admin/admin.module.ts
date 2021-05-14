import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsManagerComponent } from './pages/products-manager/products-manager.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { CategoriesManagerComponent } from './pages/categories-manager/categories-manager.component';
import { CategoryService } from './shared/services/category-service';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    CategoriesComponent,
    ManagerComponent,
    MenuComponent, ProductsManagerComponent, CategoriesManagerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    CategoryService
  ]
})
export class AdminModule { }
