import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { PaymentService } from 'src/app/shared/services/payment.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    PaymentService
  ]
})
export class ProductsModule { }
