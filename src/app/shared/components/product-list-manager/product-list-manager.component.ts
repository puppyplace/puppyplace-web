import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/admin/models/category.interface';
import { CategoryManagerService } from 'src/app/admin/shared/services/category-manager.service';

@Component({
  selector: 'app-product-list-manager',
  templateUrl: './product-list-manager.component.html',
  styleUrls: ['./product-list-manager.component.scss']
})
export class ProductListManagerComponent implements OnInit {
  public categories: Array<Category>;
  public categorySelected: Category;

  constructor(
    private categoryService: CategoryManagerService
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categories = [];

    this.categoryService.getAll()
    .pipe(map((response: any) => (response.content !== undefined ? response.content : [])))
    .subscribe(res => this.categories = res);
  }

  selectCategory(cat) {
    console.log(cat.target.data);
  }

}
