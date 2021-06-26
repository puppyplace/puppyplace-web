import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = `${environment.BASE_BACKEND_URL}/customer`;
  constructor(
      private api: HttpClient,
  ) { }

  public create(customer: Customer) {
      return this.api.post(this.url, customer);
  }

  public get(id: string) {
    return this.api.get(`${this.url}/${id}`);
  }

  public findByEmail(email: string) {
    return this.api.get(`${this.url}/email/${email}`);
  }
}