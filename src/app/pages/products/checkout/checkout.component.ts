import { Component, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Checkout, ProductCheckout} from './checkout';
import { Address } from 'src/app/models/address.interface';
import { Customer } from 'src/app/models/customer.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: Array<ProductData>;
  deliveryValue: number;
  checkout: Checkout;
  customer: Customer;
  selectedAddress: Address;
  addressFull: string;
    
  constructor(
    private cartService: CartService, 
    private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.deliveryValue = 10;
    this.products = this.cartService.getItems() || [];
    this.customer = this.cartService.getCustomer();
    this.selectedAddress = this.cartService.getSelectedAddress();
    this.addressFull = this.selectedAddress.street + ' - ' + this.selectedAddress.number + ', CEP: '+this.selectedAddress.zipcode;
  }

  finishOrder(ev: Event){
    ev.preventDefault();
    this.convertToOrder();
    this.checkoutService.create(this.checkout);
  }

  convertToOrder(){
      this.checkout = new Checkout();
      this.checkout.customerId = this.customer.id;
      this.checkout.payMethod = "CREDITCARD";
      this.checkout.addressId = this.selectedAddress.id;
      this.checkout.productOrders = this.products.map(p=>{
        let prodId, variantId
        if(p.id == 0 ){
          prodId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // Mock
          variantId = "5fb85f61-5717-4562-b3fc-2c963f66cfb1"; // Mock
        }else{
          prodId = String(p.id);
        }
        return new ProductCheckout(prodId, variantId, p.qtd, p.amount, p.total);
      });
      console.log("checkout", this.customer);
  }

  updateQtd(product: any, raise: boolean, ev: Event) {
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
