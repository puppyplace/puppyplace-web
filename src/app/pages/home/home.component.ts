import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CAROUSEL_DATA_MOCK, CAROUSEL_DATA_PRODUCTS_MOCK } from 'src/app/mocks/carousel-data.mock';
import { PAW_DATA } from 'src/app/mocks/paw-data.mock';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { Lead } from 'src/app/models/lead.interface';
import { Paw } from 'src/app/models/paw.interface';
import { LeadService } from 'src/app/shared/services/lead.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public carouselData: Array<ProductData>;
  public carouselProductsData: Array<ProductData>;
  paws:Array<Paw>;
  lead: Lead;
  leadDone: boolean = false;
  leadStatus: boolean = false;

  @ViewChildren('btnFilter') btnFilter: QueryList<ElementRef>;


  constructor(private leadService: LeadService) { }

  ngOnInit(): void {
    this.carouselData = CAROUSEL_DATA_MOCK;
    this.carouselProductsData = CAROUSEL_DATA_PRODUCTS_MOCK;
    this.paws = PAW_DATA;
    this.lead = {name: '', email: ''}
  }

  public filter(el: HTMLElement, e: Event) {
    e.preventDefault();

    const filters = this.btnFilter.toArray();

    filters.map(arr => (arr.nativeElement as HTMLElement).classList.remove('selected'));
    el.classList.add('selected');
  }

  public createLead() {
    this.leadService.create(this.lead).subscribe(result => {
        this.leadDone = true;
        this.leadStatus = true;
      }, error => {
        this.leadDone = true;
        this.leadStatus = false;
        this.hideDialog();
      }, () => this.hideDialog())
  }

  public hideDialog(){
    setTimeout(() => {
      this.leadDone = false;
      this.leadStatus = false;
    }, 5000);
  }

}
