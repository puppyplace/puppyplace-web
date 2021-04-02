import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_MOCK } from 'src/app/mocks/carousel-data.mock';
import { CarouselData } from 'src/app/models/carousel-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public carouselData: Array<CarouselData>;

  constructor( ) { }

  ngOnInit(): void {
    this.carouselData = CAROUSEL_DATA_MOCK;
  }

}
