import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CAROUSEL_DATA_MOCK, CAROUSEL_DATA_PRODUCTS_MOCK } from 'src/app/mocks/carousel-data.mock';
import { CarouselData } from 'src/app/models/carousel-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public carouselData: Array<CarouselData>;
  public carouselProductsData: Array<CarouselData>;

  @ViewChildren('btnFilter') btnFilter: QueryList<ElementRef>;

  constructor( ) { }

  ngOnInit(): void {
    this.carouselData = CAROUSEL_DATA_MOCK;
    this.carouselProductsData = CAROUSEL_DATA_PRODUCTS_MOCK;
  }

  public filter(el: HTMLElement, e: Event) {
    // remove o evento de click padrao do link
    e.preventDefault();

    // transforma queryList em array
    const filters = this.btnFilter.toArray();

    // remove a classe secundary de todos os botoes primeiro
    filters.map(arr => (arr.nativeElement as HTMLElement).classList.remove('secundary'));

    // aplica a classe no botao escolhido
    el.classList.add('secundary');
  }

}
