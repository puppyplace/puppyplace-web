import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PawComponent } from './paw/paw.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { ProductListManagerComponent } from './product-list-manager/product-list-manager.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductSliderComponent,
    FooterComponent,
    PawComponent,
    ProductListManagerComponent
  ],
  exports: [
    HeaderComponent,
    ProductSliderComponent,
    FooterComponent,
    PawComponent,
    ProductListManagerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
