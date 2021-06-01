import { Injectable } from '@angular/core';
import { ProductData } from 'src/app/models/carousel-data.interface';

// chave usada para armazenamento do storage
const CART_STORAGE_KEY = 'cartStorageKey';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  private getStorage(): Array<ProductData> {
    try {
      return (JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY)) as Array<ProductData>);
    } catch {
      // o storage nao foi usado antes e por isso deve retornar um array vazio para a primeira vez!
      return [];
    }
  }
  
  private updateStorage(products: Array<ProductData>): void {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(products));
  }

  public getItems(): Array<ProductData>{
    return this.getStorage();
  }

  /**
   * adicona um novo elemento ao carrinho
   * @param product 
   */
  public addItem(product: ProductData) {
    try {
      const storage = this.getStorage() || [];
      
      // se o item ja foi adicionado antes, apenas atualiza o carrinho
      if (storage.findIndex(pro => pro.id === product.id) > -1) {
        this.updateItem(product);
        return;
      }
      
      storage.push(product);

      this.updateStorage(storage);
    } catch (err) {
      console.warn('houve um erro ao tentar salvar o carrinho', err);
    }
  }

  /**
   * remove um elemento do carrinho
   * @param product 
   */
  public removeItem(product: ProductData) {
    try {
      let storage = this.getStorage();
      storage =  storage.filter(arr => arr.id !== product.id);

      this.updateStorage(storage);
    } catch (err) {
      console.warn('houve um erro ao tentar remover o item', err);
    }
  }

  /**
   * atualiza um elemento do carrinho
   * @param product 
   */
  public updateItem(product: ProductData) {
    try {
      const storage = this.getStorage();
      const index = storage.findIndex(arr => Number(arr.id) === Number(product.id));
      storage[index] = product;

      this.updateStorage(storage);
    } catch (err) {
      console.warn('houve um erro ao tentar atualizar o carrinho', err);
    }
  }
}
