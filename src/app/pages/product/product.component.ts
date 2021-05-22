import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChildren('btnOptions') btnOptions: QueryList<ElementRef>;

  public quantity: number;
  public total: number;
  
  constructor() { }

  ngOnInit(): void {
    this.quantity = 1;
  }

  public plus(el: HTMLElement, e: Event) {
    e.preventDefault();
    this.quantity++;
  }

  public sub(el: HTMLElement, e: Event) {
    e.preventDefault();
    
    if(this.quantity)
      this.quantity--;
    
  }

  public filter(el: HTMLElement, e: Event) {
    e.preventDefault();

    const filters = this.btnOptions.toArray();

    filters.map(arr => (arr.nativeElement as HTMLElement).classList.remove('selected'));
    el.classList.add('selected');
  }

}
