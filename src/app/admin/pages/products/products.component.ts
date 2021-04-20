import { Component, OnInit } from '@angular/core';
import { PRODUCTS_MOCK } from '../../mocks/products.mock';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;

  constructor() { }

  ngOnInit(): void {
    this.products = PRODUCTS_MOCK;
  }

}
