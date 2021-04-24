import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductData } from 'src/app/models/carousel-data.interface';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLElement>;
  @ViewChild('box', {static: false}) box: ElementRef<HTMLElement>;

  @Input('products') set setProducts(value) {
    if (value !== undefined) {
      this.current = 3;
      this.carouselProductsData = value;
      this.counter = this.carouselProductsData.length;

      this.cdr.detectChanges();
      this.boxEl = (this.box.nativeElement as HTMLElement);
      this.canvasEl = (this.canvas.nativeElement as HTMLElement);
    }
  }

  private counter: number;
  private current: number;
  private boxEl: HTMLElement;
  private canvasEl: HTMLElement;
  private animationValue: number;

  public carouselProductsData: Array<ProductData>;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.animationValue = 0;
  }

  ngOnInit(): void { }

  nextCard(e: Event) {
    e.preventDefault();
    if (this.current < this.counter) {
      this.current++;

      this.animationValue -= (this.boxEl.clientWidth + 28);
      this.canvasEl.style.transform = `translate(${this.animationValue}px)`;
    }
  }

  prevCard(e: Event) {
    e.preventDefault();
    if (this.current >= this.counter) {
      this.current--;

      this.animationValue += (this.boxEl.clientWidth + 28);
      this.canvasEl.style.transform = `translate(${this.animationValue}px)`;
    }
  }

}
