import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = `${environment.BASE_BACKEND_URL}/customer`;

  constructor(
      private api: HttpClient,
  ) { }

  public create(customer: Customer): Observable<Customer> {
    return (this.api.post(this.url, customer) as Observable<Customer>);
  }

  public get(id: string) {
    return this.api.get(`${this.url}/${id}`);
  }

  update(customer: Customer): Observable<Customer> {
    console.log('service', customer)
    return (this.api.put(`${this.url}/${customer.id}`, customer) as Observable<Customer>);
  }

  public findByEmail(email: string) {
    return this.api.get(`${this.url}/email/${email}`);
  }
}