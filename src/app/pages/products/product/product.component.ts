import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/admin/models/product.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

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
  public productId: string;

  constructor(
    private cartService: CartService,
    private activeRouter: ActivatedRoute,
    private modalService: NgbModal,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.product = null;
    this.quantity = 1;
    this.total = 0;

    this.activeRouter.params.subscribe(res => {
      this.productId = res.id;
      this.productService.getOne(this.productId)
        .subscribe(res => {
          this.product = res;
          this.updateTotal();
        })
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
    if(this.quantity < this.product.stock) {
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
    

  checkProductValue(): number {
    let value: number;
    
    try {
      value = this.product.price;
      if (!!this.product.promotional_price) {
        value = this.product.promotional_price;
      }
    } catch (err) {
      value = 0;
    }
    
    return value;
  }

  public updateTotal() {
    this.total = this.checkProductValue() * this.quantity;
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
    const price = this.checkProductValue();
    
    this.cartService.addItem({ ...this.product, qtd: this.quantity, 
      id: this.productId, price: price, total: this.total });
    this.open(this.modal);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((_) => {});
  }
}
