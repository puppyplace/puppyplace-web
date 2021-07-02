import { Component, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Checkout, ProductCheckout} from './checkout';
import { Address } from 'src/app/models/address.interface';
import { Customer } from 'src/app/models/customer.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: Array<ProductData>;
  deliveryValue: number;
  checkout: Checkout;
  public customer: Customer;
  selectedAddress : Address;
    
  constructor(
    private cartService: CartService, 
    private checkoutService: CheckoutService,
    private customerService: CustomerService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.deliveryValue = 10;
    const userLogged =  this.authService.GetUser();
    this.customerService
        .findByEmail(userLogged.email)
        .subscribe(result => {
          this.customer = result as Customer;
          console.log('init', this.customer);
    }, error => {
      console.log('error', error)
    })
    this.products = this.cartService.getItems() || [];
  }

  finishOrder(ev: Event){
    ev.preventDefault();
    this.convertToOrder();
    this.checkoutService.create(this.checkout);
  }

  convertToOrder(){
      this.checkout = new Checkout();
      console.log(this.customer);
      this.checkout.customerId = this.customer.id;
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
