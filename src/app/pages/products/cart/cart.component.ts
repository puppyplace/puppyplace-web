import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { Customer } from 'src/app/models/customer.interface';
import { AddressService } from 'src/app/shared/services/address.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  @ViewChild('content') modal: ElementRef<NgbModal>;

  public products: Array<ProductData>;
  public deliveryInput: string;
  public customer: Customer;
  public selectedAddress : string;

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,
    private adressService: AddressService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private customerService: CustomerService
    ) { }

  ngAfterViewInit(): void {
    if (this.products.length === 0) {
      this.open();
    }

    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.products = this.cartService.getItems() || [];

    try {
      this.deliveryInput = '';
      this.customer = null;
      this.getCustomer();

    } catch (err) {
      this.router.navigate(['/sign-in']);
    }
  }


  public async getCustomer() {
    const userLogged =  this.authService.GetUser();
    this.customerService
      .findByEmail(userLogged.email)
      .subscribe(result => {
        this.customer = result as Customer;
    }, error => {
      console.log('error', error)
    })
  }

  open() {
    this.modalService.open(
      this.modal,
      { ariaLabelledBy: 'modal-basic-title' }).dismissed.subscribe(res => {
        this.router.navigate(['/products']);
      })
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

  checkCartIsValid(): boolean {
    let flag = true;

    if (this.products.length > 0
      && this.selectedAddress !== null
      && this.deliveryInput !== '') {
        flag = false;
      }

    return flag;
  }

  public setSelectedAddress(idAddress: string): void{
    const address = this.customer.addresses.find(a=> a.id == idAddress);
    this.adressService.addItem(address);
  }

  sendToCheckout(ev: Event) {
    ev.preventDefault();
    this.setSelectedAddress(this.selectedAddress);
    this.router.navigate(['/products/checkout']);
  }
}
