import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../models/address.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = `${environment.BASE_BACKEND_URL}/customer`;

  constructor(
      private api: HttpClient,
  ) { }

  public create(customerID: string, address: Address): Observable<Address> {
    return (this.api.post(`${this.url}/${customerID}/address`, address) as Observable<Address>);
  }

}