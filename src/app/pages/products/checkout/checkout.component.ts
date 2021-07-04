import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductData } from 'src/app/models/carousel-data.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Checkout, ProductCheckout} from './checkout';
import { Address } from 'src/app/models/address.interface';
import { Customer } from 'src/app/models/customer.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Payment, PaymentUserSex } from 'src/app/models/payment.interface';
import { AddressService } from 'src/app/shared/services/address.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnInit {

  products: Array<ProductData>;
  deliveryValue: number;
  checkout: Checkout;
  customer: Customer;
  selectedAddress: Address;
  addressFull: string;
  showModal: boolean;

  @ViewChild('content') modal: ElementRef<NgbModal>;

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,
    private router: Router,
    private checkoutService: CheckoutService,
    private adressService: AddressService,
    private authService: AuthService,
    private customerService: CustomerService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.deliveryValue = 10;
    this.products = this.cartService.getItems() || [];
    this.getCustomer();
    this.selectedAddress = this.adressService.getItems();
    this.showModal = false;

    try {
      this.addressFull = this.selectedAddress.street + ' - ' + this.selectedAddress.number + ', CEP: '+this.selectedAddress.zipcode;
    } catch (err) {
      this.showModal = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.showModal) {
      this.callModal();
    }
  }

  public getCustomer() {
    this.customer = null;
    const userLogged =  this.authService.GetUser();
    this.customerService
      .findByEmail(userLogged.email)
      .subscribe(result => {
        this.customer = result as Customer;
    }, error => {
      console.log('error', error)
    })
  }

  callModal() {
    this.modalService.open(
      this.modal,
      { ariaLabelledBy: 'modal-basic-title' }).dismissed.subscribe(res => {
        this.router.navigate(['/profile']);
      })
  }

  finishOrder(ev: Event){
    ev.preventDefault();
    this.convertToOrder();
    this.checkoutService.create(this.checkout)
    .subscribe((res)=>{
      const response = (res as any);


      const paymentData: Payment = {
        fatura: {
          desconto: 0 ,
          forma_pagamento: 1,
          parcelamento: 1,
          sub_total: this.totalValue(),
          valor_total: this.totalValue()
        },
        pagador: {
          nome: this.customer.first_name,
          cpf_cnpj: response.customer.customerDocument,
          data_nascimento: response.customer.customerBirthdate,
          email: response.customer.customerEmail,
          telefone_principal: this.customer.cellphone,
          sexo: PaymentUserSex.MALE,
          endereco: {
            bairro: this.selectedAddress.district,
            cep: this.selectedAddress.zipcode.replace('-', ''),
            cidade: this.selectedAddress.city,
            complemento: this.selectedAddress.complement,
            logradouro: this.selectedAddress.street,
            numero: this.selectedAddress.number.toString(),
            uf: this.selectedAddress.state
          }
        }
      };

      this.paymentService.pay(paymentData)
        .subscribe(res => {
          window.open(res.proxima_url, '_blank');
        });
    },
    response=>{
      console.log("POST call in error", response);
    },
    ()=>{
      console.log("The POST observable is now completed.");
    });
  }

  convertToOrder(){
      this.checkout = new Checkout();
      this.checkout.customerId = this.customer.id;
      this.checkout.payMethod = "CREDITCARD";
      this.checkout.addressId = this.selectedAddress.id;
      this.checkout.productOrders = this.products.map(p=>{
        let prodId, variantId
        if(p.id === null ){
          prodId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // Mock
          variantId = "5fb85f61-5717-4562-b3fc-2c963f66cfb1"; // Mock
        }else{
          prodId = String(p.id);
          variantId = p.variant.id
        }
        return new ProductCheckout(prodId, variantId, p.qtd, p.price, p.total);
      });

      console.log("checkout", this.customer);
  }

  updateQtd(product: any, raise: boolean, ev: Event) {
    ev.preventDefault();
    if (!raise && product.qtd === 1) return;

    if (raise) {
      product.qtd++;
    } else if (!raise) {
      product.qtd--;
    }

    product.total = product.amount * product.qtd;
    this.cartService.updateItem(product);
  }

  removeProduct(product: ProductData, ev: Event) {
    ev.preventDefault();
    this.cartService.removeItem(product);
    this.products = this.products.filter(arr => arr.id !== product.id);
  }

  totalValue() {
    return this.products.reduce((curr, { total }) => curr + total, 0) + this.deliveryValue;
  }

}
