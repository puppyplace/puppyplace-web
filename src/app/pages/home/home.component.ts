import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CAROUSEL_DATA_MOCK, CAROUSEL_DATA_PRODUCTS_MOCK } from 'src/app/mocks/carousel-data.mock';
import { PAW_DATA } from 'src/app/mocks/paw-data.mock';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { Paw } from 'src/app/models/paw.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public carouselData: Array<ProductData>;
  public carouselProductsData: Array<ProductData>;
  paws:Array<Paw>;

  @ViewChildren('btnFilter') btnFilter: QueryList<ElementRef>;

  

  constructor( ) { }

  ngOnInit(): void {
    this.carouselData = CAROUSEL_DATA_MOCK;
    this.carouselProductsData = CAROUSEL_DATA_PRODUCTS_MOCK;
    this.paws = PAW_DATA;
  }

  public filter(el: HTMLElement, e: Event) {
    e.preventDefault();

    const filters = this.btnFilter.toArray();

    filters.map(arr => (arr.nativeElement as HTMLElement).classList.remove('selected'));
    el.classList.add('selected');
  }

}
