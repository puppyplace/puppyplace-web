import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  private productId: string;
  private productToUpdate: Product;

  public productForm: FormGroup;
  public categories: Array<Category>;
  public categorySelected: string;
  public upadteFlag: boolean;


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.upadteFlag = false;

    // checa se existe algum id selecionado e trata o form como um update
    this.activatedRoute.params.subscribe(params => {
      if (!!params.id) {
        this.upadteFlag = true;
        this.productId = params.id;

        this.findProduct();
        return;
      }

      this.initForm();
    });
  }

  // busca o produto se for para update
  findProduct() {
    this.productService.getOne(this.productId)
      .subscribe(product => {
        this.productToUpdate = product;
        this.initForm();
      });
  }

  // TODO: buscar as categorias pelo backend
  getCategories() {
    this.categories = CATEGORIES_MOCK;
  }

  initForm(): void {
    this.productForm = new FormGroup({
      description: new FormControl(this.getFieldValue('description'), [ Validators.required, Validators.minLength(10) ]),
      title: new FormControl(this.getFieldValue('title'), [ Validators.required, Validators.minLength(10) ]),
      price: new FormControl(this.getFieldValue('price'), [ Validators.required, Validators.pattern(/[0-9]|\,|\./)]),
      stock: new FormControl(this.getFieldValue('stock'), [ Validators.required, Validators.pattern(/[0-9]/)]),
      specifications: new FormControl(this.getFieldValue('specifications'), [ Validators.required, Validators.minLength(10)]),
      unit: new FormControl(this.getFieldValue('unit'), [ Validators.required, Validators.pattern(/[0-9]/) ]),
      promotional_price: new FormControl(this.getFieldValue('promotional_price')),
      avatar_url: new FormControl(this.getFieldValue('avatar_url')),
      product_code: new FormControl(this.getFieldValue('product_code'), [ Validators.required]),
      isbn_code: new FormControl(this.getFieldValue('isbn_code'), [ Validators.required]),
      id_categories: new FormControl(this.getFieldValue('id_categories')[0])
    });
  }

  /**
   * tenta buscar o campo com o field correto. Se falhar, fallback para string vazia
   * @param field
   * @returns
   */
  getFieldValue(field) {
    let value = '';
    try {
      value = this.productToUpdate[field];
    } catch (err) {
      console.warn('nao foi possivel encontrar este campo', field)
    }

    return value;
  }

  selectCategory(category: string) {
    this.categorySelected = category;
  }

  finishForm(ev: Event) {
    ev.preventDefault();

    const formData: Product = {
      ...this.productForm.getRawValue(),
      id_categories: [this.productForm.getRawValue().id_categories]
    };

    let request$: Observable<Product>;
    if (!this.upadteFlag) {
      request$ = this.productService.create(formData);
    } else {
      formData.id = this.productId;
      request$ = this.productService.edit(formData);
    }

    // faz o request e manda para a tela de produtos
    request$.subscribe(_ => this.router.navigate(['/admin/products']))
  }
}
