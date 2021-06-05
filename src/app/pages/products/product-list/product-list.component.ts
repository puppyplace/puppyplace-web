import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PAW_DATA } from 'src/app/mocks/paw-data.mock';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { Paw } from 'src/app/models/paw.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public paws: Array<Paw>;
  public products: Array<ProductData>;

  constructor(
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.paws = PAW_DATA;
    this.products = null;

    this.getProducts();
  }

  getProducts() {
    this.service.getAll()
      .pipe(map((result) => (result as any).content))
      .subscribe(res => this.products = res)
  }
}
