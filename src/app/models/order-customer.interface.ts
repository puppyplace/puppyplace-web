import {ProductOrder} from './order-product.interface'

export interface CustomerOrder {
  
  id?: string,
  customerId: string,
  addressId: string,
  payMethod: string,
  total: number,
  trackingCode: string,
  productOrders: Array<ProductOrder>,

}
