import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_PRODUCTS_MOCK } from 'src/app/mocks/carousel-data.mock';
import { ProductData } from 'src/app/models/carousel-data.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Array<ProductData>;

  constructor() { }

  ngOnInit(): void {
    this.products = CAROUSEL_DATA_PRODUCTS_MOCK;
  }

  updateQtd(product: ProductData, raise: boolean, ev: Event) {
    ev.preventDefault();

    if (raise) {
      product.qtd++;
    } else if (!raise && product.qtd > 1) {
      product.qtd--;
    }
  }

  removeProduct(product: ProductData, ev: Event) {
    ev.preventDefault();
    this.products = this.products.filter(arr => arr.id !== product.id);
  }

  totalValue() {
    return this.products.reduce((curr, { amount }) => curr + amount, 0);
  }
}
