import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CAROUSEL_DATA_MOCK, CAROUSEL_DATA_PRODUCTS_MOCK } from 'src/app/mocks/carousel-data.mock';
import { CarouselData } from 'src/app/models/carousel-data.interface';

interface Paw {
  size: number;
  color: string;
  angle: number;
  position: {top: number, right: number}
}

const PAWS_DATA: Array<Paw> = [
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -16.15,
    position: {top: 4, right: 20}
  },
   {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: 16.15,
    position: {top: 15, right: 34}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: 146.15,
    position: {top: 12, right: 9}
  },
 
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: 46.15,
    position: {top: 29, right: 16}
  },
  
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -2.85,
    position: {top: 9, right: -6}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: 22.85,
    position: {top: 25, right: 0}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -152.85,
    position: {top: 10, right: -15}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: 25.85,
    position: {top: 26, right: -17}
  },

  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: 146.85,
    position: {top: 8, right: -43}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -76.85,
    position: {top: 25, right: -44}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -146.85,
    position: {top: 14, right: -56}
  },

  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -146.85,
    position: {top: 42, right: -54}
  },

  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -50.15,
    position: {top: 44, right: 60}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: 50.15,
    position: {top: 49, right: 49}
  },
  {
    size: 55,
    color: 'rgba(182, 216, 227, 0.3)',
    angle: -70.15,
    position: {top: 65, right: 74}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: -50.15,
    position: {top: 74, right: 66}
  },
  
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: 50.15,
    position: {top: 76, right: 40}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: 160.15,
    position: {top: 55, right: 38}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: 75,
    position: {top: 79, right: 14}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: -50.15,
    position: {top: 69, right: -20}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: -223.15,
    position: {top: 100, right: 20}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: 200,
    position: {top: 110, right: 10}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: 160,
    position: {top: 110, right: -35}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: -10,
    position: {top: 80, right: -70}
  },
  {
    size: 55,
    color: 'rgba(164, 179, 220, 0.3)',
    angle: 60,
    position: {top: 100, right: -80}
  },
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public carouselData: Array<CarouselData>;
  public carouselProductsData: Array<CarouselData>;
  paws:Array<Paw>;

  @ViewChildren('btnFilter') btnFilter: QueryList<ElementRef>;

  constructor( ) { }

  ngOnInit(): void {
    this.carouselData = CAROUSEL_DATA_MOCK;
    this.carouselProductsData = CAROUSEL_DATA_PRODUCTS_MOCK;
    this.paws = PAWS_DATA;
  }

  public filter(el: HTMLElement, e: Event) {
    e.preventDefault();

    const filters = this.btnFilter.toArray();

    filters.map(arr => (arr.nativeElement as HTMLElement).classList.remove('selected'));
    el.classList.add('selected');
  }

}
