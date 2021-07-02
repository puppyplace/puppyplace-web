import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  @ViewChild('content') modal: ElementRef<NgbModal>;

  public products: Array<ProductData>;

  public cepInput: string;
  public deliveryInput: string;

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,
    private router: Router) { }
  
  ngAfterViewInit(): void {
    if (this.products.length === 0) {
      this.open();
    }
  }

  ngOnInit(): void {
    this.cepInput = '';
    this.deliveryInput = '';

    this.products = this.cartService.getItems() || [];
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
      && this.cepInput !== ''
      && this.deliveryInput !== '') {
        flag = false;
      }

    return flag;
  }

  sendToCheckout(ev: Event) {
    ev.preventDefault();
    this.router.navigate(['/products/checkout']);
  }
}
