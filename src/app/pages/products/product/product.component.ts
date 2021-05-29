import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { PRODUCT_DATA } from 'src/app/mocks/product-data.mock';
import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChildren('btnOptions') btnOptions: QueryList<ElementRef>;
  @ViewChild('content') modal: ElementRef;

  public total: number;
  public quantity: number;
  public product: Product;
  public variantIndex: number = 0;
  public productId: number;

  constructor(
    private cartService: CartService,
    private activeRouter: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.product = PRODUCT_DATA;
    this.quantity = 1;
    this.updateTotal();

    this.activeRouter.params.subscribe(res => {
      this.productId = (res.id as number);
    })
  }

  public plus(el: HTMLElement, e: Event) {
    e.preventDefault();
    this.incrementQuantity();

  }

  public sub(el: HTMLElement, e: Event) {
    e.preventDefault();
    this.decrementDecrement();
  }

  public incrementQuantity() {
    if(this.quantity < this.product.variant[this.variantIndex].amount) {
      this.quantity++;
      this.updateTotal();
    }
  }
  public decrementDecrement() {
    if(this.quantity) {
      this.quantity--;
      this.updateTotal();
    }
  }
    
  public updateTotal() {
    this.total = this.product.variant[this.variantIndex].price_promotional * this.quantity;
  }
  
  public filter(el: HTMLElement, e: Event, index: number) {
    e.preventDefault();
    this.variantIndex = index;
    this.quantity = 1;
    this.updateTotal();
    
    const filters = this.btnOptions.toArray();

    filters.map(arr => (arr.nativeElement as HTMLElement).classList.remove('selected'));
    el.classList.add('selected');
  }

  public addItemToCart() {
    const price = this.product.variant[this.variantIndex].price_promotional;
    
    this.cartService.addItem({ ...this.product, qtd: this.quantity, 
      id: this.productId, amount: price, total: this.total});
    this.open(this.modal);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((_) => {});
  }
}
