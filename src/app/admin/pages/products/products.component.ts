import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS_MOCK } from '../../mocks/products.mock';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products = PRODUCTS_MOCK;
  }

  goToProduct(id): void {
    this.router.navigate([`/admin/product/${id}`]);
  }
}
