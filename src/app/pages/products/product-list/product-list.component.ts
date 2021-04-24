import { Component, OnInit } from '@angular/core';
import { PAW_DATA } from 'src/app/mocks/paw-data.mock';
import { Paw } from 'src/app/models/paw.interface';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { CAROUSEL_DATA_PRODUCTS_MOCK } from 'src/app/mocks/carousel-data.mock';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public paws: Array<Paw>;
  public products: Array<ProductData>;

  constructor() { }

  ngOnInit(): void {
    this.paws = PAW_DATA;
    this.products = CAROUSEL_DATA_PRODUCTS_MOCK
  }

}
