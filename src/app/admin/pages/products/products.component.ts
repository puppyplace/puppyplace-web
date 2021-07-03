import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Product } from '../../models/product.interface';
import { ProductManagerService } from '../../shared/services/product-manager.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;

  constructor(
    private router: Router,
    private productService: ProductManagerService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.products = null;
  }

  getAllProducts() {
    this.productService.getAll()
    .pipe(map(response => (response as any).content))
    .subscribe(res => this.products = res);
  }

  goToProduct(id): void {
    this.router.navigate([`/admin/product/${id}`]);
  }
}
