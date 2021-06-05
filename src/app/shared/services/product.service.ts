import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/admin/models/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected url = `${environment.BASE_BACKEND_URL}/product`;

  constructor(
    protected api: HttpClient
  ) { }

  getAll(): Observable<Array<Product>> {
    return (this.api.get(this.url) as Observable<Array<Product>>);
  }

  getOne(id: string): Observable<Product> {
    return (this.api.get(`${this.url}/${id}`) as Observable<Product>);
  }
}
