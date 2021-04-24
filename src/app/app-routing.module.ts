import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
