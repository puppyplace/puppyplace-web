import { Component, OnInit } from '@angular/core';
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
  public pages: Array<number>;
  public currentPage: number;

  constructor(
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.paws = PAW_DATA;
    this.products = null;
    this.pages = [];

    this.currentPage = 1;
    this.getProducts();
  }

  getProducts() {
    this.service.getAll(this.currentPage).subscribe(res => {
      const result: any = res;
      this.pages = Array(result.totalPages - 1).fill(1).map((p, i) => i+1);
      this.products = result.content;
    });
  }

  changePageByNum(num: number) {
    if (this.currentPage === num) return;

    this.currentPage = num;
    this.getProducts();
  }

  changePageByArrow(next: boolean) {
    if (next && this.currentPage < this.pages.length) {
      this.currentPage++;
    } else if (!next && this.currentPage !== 1){
      this.currentPage--;
    } else {
      return;
    }

    this.getProducts();
  }
}
