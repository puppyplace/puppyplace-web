import { Component, OnInit } from '@angular/core';

import { CategoryManagerService } from '../../shared/services/category-manager.service';
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
    private productService: ProductManagerService,
    private categoryService: CategoryManagerService
  ) { }

  ngOnInit(): void {
    this.productCounter = 0;
    this.getProductCounter();

    this.categoryCounter = 0;
    this.getCategoryCounter();
  }

  getProductCounter() {
    this.productService.getAll().subscribe(res => this.productCounter = (res as any).totalElements);
  }

  getCategoryCounter() {
    this.categoryService.getAll().subscribe(res => this.categoryCounter = (res as any).totalElements);
  }
}
