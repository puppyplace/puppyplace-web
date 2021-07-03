import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Category } from '../../models/category.interface';
import { CategoryManagerService } from '../../shared/services/category-manager.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category>;

  constructor(
    private router: Router,
    private categoryService: CategoryManagerService
  ) { }

  ngOnInit(): void {
    this.categories = [];
    this.categoryService.getAll()
    .pipe(map((response: any) => (response.content !== undefined ? response.content : [])))
    .subscribe(res => this.categories = res);
  }

  goToCategory(id: number): void {
    this.router.navigate([`/admin/category/${id}`])
  }
}
