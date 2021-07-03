import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ProductData } from 'src/app/models/carousel-data.interface';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLElement>;
  @ViewChildren('box') box: QueryList<ElementRef>;

  @Input('products') set setProducts(value) {
    if (value !== undefined) {
      this.current = 2;
      this.carouselProductsData = value;
      this.counter = this.carouselProductsData.length;

      this.cdr.detectChanges();
      this.boxEl = (this.getBox(0) as HTMLElement);
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
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.animationValue = 0;
  }

  ngOnInit(): void { }

  nextCard(e: Event) {
    e.preventDefault();
    if ((this.current + 1) < this.counter) {
      this.current++;
      this.boxEl = this.getBox(this.current);

      const getStyles = window.getComputedStyle((this.boxEl as Element));
      this.animationValue -= (this.boxEl.clientWidth + this.getMarginAsNumber(getStyles.marginRight));
      this.canvasEl.style.transform = `translate(${this.animationValue}px)`;
    }
  }

  prevCard(e: Event) {
    e.preventDefault();
    if ((this.current - 1) >= 2) {
      this.current--;
      this.boxEl = this.getBox(this.current);

      const getStyles = window.getComputedStyle((this.boxEl as Element));
      this.animationValue += (this.boxEl.clientWidth + this.getMarginAsNumber(getStyles.marginRight));
      this.canvasEl.style.transform = `translate(${this.animationValue}px)`;
    }
  }

  getBox(index: number): HTMLElement {
    const arr = this.box.toArray();
    return arr[index].nativeElement;
  }

  getMarginAsNumber(margin: string): number {
    return Number(margin.replace(/px/g, ''));
  }

  goToProduct(id) {
    this.router.navigate([`/products/${id}`]);
  }
}
