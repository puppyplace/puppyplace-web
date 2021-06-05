import { Component, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Array<ProductData>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products = this.cartService.getItems() || [];
  }

  updateQtd(product: ProductData, raise: boolean, ev: Event) {
    ev.preventDefault();
    if (!raise && product.qtd === 1) return;

    if (raise) {
      product.qtd++;
    } else if (!raise) {
      product.qtd--;
    }

    product.total = product.price * product.qtd;
    this.cartService.updateItem(product);
  }

  removeProduct(product: ProductData, ev: Event) {
    ev.preventDefault();
    this.cartService.removeItem(product);
    this.products = this.products.filter(arr => arr.id !== product.id);
  }

  totalValue() {
    return this.products.reduce((curr, { total }) => curr + total, 0);
  }
}
