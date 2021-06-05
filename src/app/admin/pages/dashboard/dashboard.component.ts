import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../../shared/services/product-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public productCounter: number;
  public categoryCounter: number;

  constructor(
    private productService: ProductManagerService
  ) { }

  ngOnInit(): void {
    this.productCounter = 0;
    this.getProductCounter();
  }

  getProductCounter() {
    this.productService.getAll().subscribe(res => this.productCounter = (res as any).totalElements);
  }
}
