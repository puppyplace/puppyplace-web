import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '../../models/category.interface';
import { Product, ProductDetail, ProductSpecification, ProductVariant } from '../../models/product.interface';
import { CategoryManagerService } from '../../shared/services/category-manager.service';
import { ProductManagerService } from '../../shared/services/product-manager.service';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.scss']
})
export class ProductsManagerComponent implements OnInit {
  private productId: string;
  private productToUpdate: Product;

  public productForm: FormGroup;
  public productSpecificationForm: Array<FormGroup>;
  public productDescriptionForm: Array<FormGroup>;
  public productVariantForm: Array<FormGroup>;

  public categories: Array<Category>;
  public categorySelected: string;
  public upadteFlag: boolean;

  constructor(
    private productService: ProductManagerService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryManagerService,
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

      this.productSpecificationForm = [];
      this.buildSpecificationProductForm();

      this.productDescriptionForm = [];
      this.buildDescriptionProductForm();

      this.productVariantForm = [];
      this.buildVariantProductForm();
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

  getCategories() {
    this.categories = [];
    this.categoryService.getAll()
    .pipe(map((response: any) => (response.content !== undefined ? response.content : [])))
    .subscribe(res => this.categories = res);

  }

  initForm(): void {
    this.productForm = new FormGroup({
      description: new FormControl(this.getFieldValue('description'), [ Validators.required, Validators.minLength(10) ]),
      title: new FormControl(this.getFieldValue('title'), [ Validators.required, Validators.minLength(10) ]),
      avatar_url: new FormControl(this.getFieldValue('avatar_url')),
      product_code: new FormControl(this.getFieldValue('product_code')),
      id_categories: new FormControl(this.getFieldValue('id_categories')[0])
    });
  }

  buildSpecificationProductForm() {
    const builder = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    this.productSpecificationForm.push(builder);
  }

  removeSpecificationForm(index: number) {
    if (this.productSpecificationForm.length === 1) return;
    this.productSpecificationForm = this.productSpecificationForm.filter((arr, i) => i !== index);
  }

  buildDescriptionProductForm() {
    const builder = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    this.productDescriptionForm.push(builder);
  }

  removeDescriptionForm(index: number) {
    if (this.productDescriptionForm.length === 1) return;
    this.productDescriptionForm = this.productDescriptionForm.filter((arr, i) => i !== index);
  }

  buildVariantProductForm() {
    const builder = new FormGroup({
      price: new FormControl(0, [Validators.required]),
      unit: new FormControl(0, [Validators.required]),
      stock: new FormControl(0, [Validators.required]),
      percent_promotional: new FormControl(0, [Validators.required]),
      price_promotional: new FormControl(0, [Validators.required]),
      isbn_code: new FormControl('', [Validators.required])
    });

    this.productVariantForm.push(builder);
  }

  removeVariantProductForm(index: number) {
    if (this.productVariantForm.length === 1) return;
    this.productVariantForm = this.productVariantForm.filter((arr, i) => i !== index);
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

    const variants: Array<ProductVariant> = this.productVariantForm.map(arr => arr.getRawValue());
    const descriptions: Array<ProductDetail> = this.productDescriptionForm.map(arr => arr.getRawValue());
    const specifications: Array<ProductSpecification> = this.productSpecificationForm.map(arr => arr.getRawValue());

    const productBasicData = this.productForm.getRawValue();
    productBasicData.id_categories = [ productBasicData.id_categories ]; // TODO: ajustar a lista de categorias

    const productObject = {
      ...productBasicData,
      variants: variants,
      details: descriptions,
      specifications: specifications
    };

    let request$: Observable<Product>;
    request$ = this.productService.create(productObject);

    // faz o request e manda para a tela de produtos
    request$.subscribe(res => this.router.navigate(['/admin/products']));
  }
}
