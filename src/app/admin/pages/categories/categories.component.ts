import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CATEGORIES_MOCK } from '../../mocks/categories.mock';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categories = CATEGORIES_MOCK;
  }

  goToCategory(id: number): void {
    this.router.navigate([`/admin/category/${id}`])
  }
}
