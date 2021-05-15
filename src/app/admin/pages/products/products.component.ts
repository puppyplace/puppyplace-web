import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS_MOCK } from '../../mocks/products.mock';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.products = PRODUCTS_MOCK;
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
