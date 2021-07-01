import { ProductOrder } from 'src/app/models/order-product.interface';
import { CustomerOrder } from './../../../models/order-customer.interface';
export {Checkout, ProductCheckout}

class Checkout implements CustomerOrder{
    id?: string;
    customerId: string;
    addressId: string;
    payMethod: string;
    total: number;
    trackingCode: string;
    productOrders: ProductCheckout[];
} 

class ProductCheckout implements ProductOrder{
    
    constructor(public productId: string, public unitPrice: number,
         public quantity: number, public totalPrice: number, public id?: string){ }
}