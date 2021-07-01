import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PawComponent } from './components/paw/paw.component';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { ProductListManagerComponent } from './components/product-list-manager/product-list-manager.component';
import { RouterModule } from '@angular/router';
import { LeadService } from './services/lead.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { CustomerService } from './services/customer.service';
import { CheckoutService } from './services/checkout.service'

@NgModule({
  declarations: [
    HeaderComponent,
    ProductSliderComponent,
    FooterComponent,
    PawComponent,
    ProductListManagerComponent
  ],
  providers: [
    LeadService,
    CartService,
    CustomerService,
    CheckoutService
  ],
  exports: [
    HeaderComponent,
    ProductSliderComponent,
    FooterComponent,
    PawComponent,
    ProductListManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class SharedModule { }
