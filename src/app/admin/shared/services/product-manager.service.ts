import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

import { Product } from '../../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService extends ProductService {
  
  constructor(
    protected api: HttpClient
  ) { super(api); }

  create(data: Product): Observable<Product> {
    return (this.api.post(this.url, data) as Observable<Product>);
  }

  edit(data: Product): Observable<Product> {
    return (this.api.put(`${this.url}/${data.id}`, data) as Observable<Product>);
  }

  delete(id: string): Observable<Product> {
    return (this.api.delete(`${this.url}/${id}`) as Observable<Product>);
  }
}
