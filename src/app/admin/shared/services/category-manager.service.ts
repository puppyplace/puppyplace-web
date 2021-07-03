import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category.interface';
@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {
  private url = `${environment.BASE_BACKEND_URL}/category`;

  constructor(
    private api: HttpClient
  ) { }

  create(data: Category): Observable<Category> {
    return (this.api.post(this.url, data) as Observable<Category>);
  }

  getAll(): Observable<Array<Category>> {
    return (this.api.get(this.url) as Observable<Array<Category>>);
  }

  getOne(uuid: string): Observable<Category> {
    return (this.api.get(`${this.url}/${uuid}`) as Observable<Category>);
  }

  update(category: Category): Observable<Category> {
    return (this.api.put(`${this.url}/${category.id}`, category) as Observable<Category>);
  }
}
