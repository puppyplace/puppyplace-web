import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.BASE_BACKEND_URL}/product`;

  constructor(
    private api: HttpClient
  ) { }

  getAll(): Observable<Array<Product>> {
    return (this.api.get(this.url) as Observable<Array<Product>>);
  }

  getOne(id: string): Observable<Product> {
    return (this.api.get(`${this.url}/${id}`) as Observable<Product>);
  }

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
