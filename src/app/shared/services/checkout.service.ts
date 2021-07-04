import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkout } from '../../pages/products/checkout/checkout'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private url = `${environment.BASE_BACKEND_URL}/order`;

  constructor( private api: HttpClient) { }

  public create(checkout: Checkout) {
    return this.api.post(this.url, checkout);
  }
}
