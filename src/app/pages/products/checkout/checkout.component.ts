import { Component, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Checkout, ProductCheckout} from './checkout'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: Array<ProductData>;
  deliveryValue: number;
  checkout: Checkout;
    
  constructor(
    private cartService: CartService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.deliveryValue = 10;
    this.products = this.cartService.getItems() || [];
  }

  finishOrder(ev: Event){
    ev.preventDefault();
    this.convertToOrder();
    console.log(this.checkout);
    this.checkoutService.create(this.checkout);
    console.log('enviado backend');
  }

  convertToOrder(){
      this.checkout = new Checkout();
   //   this.checkout.customerId = 'pegar ID do Cliente';
   //   this.checkout.addressId = 'endereco selecionado';
      this.checkout.productOrders = this.products.map(p=>{
        return new ProductCheckout(String(p.id), p.qtd, p.amount, p.total);
      });
  }

  updateQtd(product: ProductData, raise: boolean, ev: Event) {
    ev.preventDefault();
    if (!raise && product.qtd === 1) return;

    if (raise) {
      product.qtd++;
    } else if (!raise) {
      product.qtd--;
    }

    product.total = product.amount * product.qtd;
    this.cartService.updateItem(product);
  }

  removeProduct(product: ProductData, ev: Event) {
    ev.preventDefault();
    this.cartService.removeItem(product);
    this.products = this.products.filter(arr => arr.id !== product.id);
  }

  totalValue() {
    return this.products.reduce((curr, { total }) => curr + total, 0) + this.deliveryValue;
  }

}
