import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CATEGORIES_MOCK } from '../../mocks/categories.mock';
import { Category } from '../../models/category.interface';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.scss']
})
export class ProductsManagerComponent implements OnInit {
  public productForm: FormGroup;
  public categories: Array<Category>;
  public categorySelected: string;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  // TODO: buscar as categorias pelo backend
  getCategories() {
    this.categories = CATEGORIES_MOCK;
  }

  initForm(): void {
    this.productForm = new FormGroup({
      description: new FormControl('', [ Validators.required, Validators.minLength(10) ]),
      title: new FormControl('', [ Validators.required, Validators.minLength(10) ]),
      price: new FormControl('', [ Validators.required, Validators.pattern(/[0-9]|\,|\./)]),
      stock: new FormControl('', [ Validators.required, Validators.pattern(/[0-9]/)]),
      specifications: new FormControl('', [ Validators.required, Validators.minLength(10)]),
      unit: new FormControl('', [ Validators.required, Validators.pattern(/[0-9]/) ]),
      promotional_price: new FormControl(''),
      avatar_url: new FormControl(''),
      product_code: new FormControl('', [ Validators.required]),
      isbn_code: new FormControl('', [ Validators.required])
    });
  }

  selectCategory(category: string) {
    this.categorySelected = category;
  }

  finishForm(ev: Event) {
    ev.preventDefault();
    const formData: Product = { ...this.productForm.getRawValue(), id_categories: [ this.categorySelected ] };
    this.productService.create(formData).subscribe(_ => this.router.navigate(['/admin/products']))
  }
}
