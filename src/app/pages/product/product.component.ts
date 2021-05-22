import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { PRODUCT_DATA } from 'src/app/mocks/product-data.mock';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChildren('btnOptions') btnOptions: QueryList<ElementRef>;

  public total: number;
  public product: Product;
  public variantIndex: number = 0;
  
  constructor() { }

  ngOnInit(): void {
    this.product = PRODUCT_DATA;
  }

  public plus(el: HTMLElement, e: Event) {
    e.preventDefault();
    this.product.quantity++;
  }

  public sub(el: HTMLElement, e: Event) {
    e.preventDefault();
    
    if(this.product.quantity)
      this.product.quantity--;
    
  }

  public filter(el: HTMLElement, e: Event, index: number) {
    e.preventDefault();
    this.variantIndex = index;
    const filters = this.btnOptions.toArray();

    filters.map(arr => (arr.nativeElement as HTMLElement).classList.remove('selected'));
    el.classList.add('selected');
  }

}
