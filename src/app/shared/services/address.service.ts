import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../models/address.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// chave usada para armazenamento do storage
const ADDRESS_STORAGE_KEY = 'addressStorageKey';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = `${environment.BASE_BACKEND_URL}/customer`;

  public selectedAddress : Address;

  constructor(
      private api: HttpClient,
  ) { }

  public create(customerID: string, address: Address): Observable<Address> {
    return (this.api.post(`${this.url}/${customerID}/address`, address) as Observable<Address>);
  }

  public update(customerID: string, address: Address): Observable<Address> {
    return (this.api.put(`${this.url}/${customerID}/address/${address.id}`, address) as Observable<Address>);
  }

  public delete(customerID: string, addressID: string): Observable<string> {
    return (this.api.delete(`${this.url}/${customerID}/address/${addressID}`) as Observable<string>);
  }

  public makeMain(customerID: string, addressID: string): Observable<string> {
    return (this.api.patch(`${this.url}/${customerID}/address/${addressID}`, null) as Observable<string>);
  }

  public getSelectedAddress(): Address {
    return this.selectedAddress;
  }

  private getStorage(): Address {
    try {
      return (JSON.parse(sessionStorage.getItem(ADDRESS_STORAGE_KEY)) as Address);
    } catch {
      // o storage nao foi usado antes e por isso deve retornar um array vazio para a primeira vez!
      return null;
    }
  }

  private updateStorage(products: Address): void {
    sessionStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(products));
  }

  public getItems(): Address{
    return this.getStorage();
  }

  /**
   * adicona um novo elemento ao address
   * @param address
   */
  public addItem(address: Address) {
    try {
      this.updateStorage(address);
    } catch (err) {
      console.warn('houve um erro ao tentar salvar o address', err);
    }
  }
}
