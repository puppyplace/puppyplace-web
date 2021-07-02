import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address.interface';
import { Customer } from 'src/app/models/customer.interface';
import { AddressService } from 'src/app/shared/services/address.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup;
  public addressForm: FormGroup;
  public customer: Customer;
  public selectedAddress : Address;


  constructor(
    private customerService: CustomerService,
    private addressService: AddressService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const userLogged =  this.authService.GetUser();

    this.selectedAddress = {
      id: '',
      street: '',
      number: 0,
      complement: '',
      city: '',
      district: '',
      is_main: false,
      state: '',
      zipcode: ''
    };

    this.customerService
        .findByEmail(userLogged.email)
        .subscribe(result => {
          this.customer = result as Customer;
          const mainAddress = this.customer.addresses.find(address => address.is_main) as Address;

          if(mainAddress) this.selectedAddress = mainAddress;

          this.initForm();
         this.initAddressForm();
    }, error => {
      console.log('error', error)
    })
  }

  initForm(): void {
    this.customerForm = new FormGroup({
      first_name: new FormControl(this.customer['first_name'], [ Validators.required ]),
      last_name: new FormControl(this.customer['last_name'], [ Validators.required ]),
      document: new FormControl(this.customer['document'], [ Validators.required ]),
      email: new FormControl(this.customer['email'], [ Validators.required ]),
      cellphone: new FormControl(this.customer['cellphone']),
      birthdate: new FormControl(this.customer['birthdate'], [ Validators.required ]),
    });
  }
  
  initAddressForm(): void {
    this.addressForm = new FormGroup({
      id: new FormControl(this.selectedAddress['id'], [ Validators.required ]),
      street: new FormControl(this.selectedAddress['street'], [ Validators.required ]),
      number: new FormControl(this.selectedAddress['number'], [ Validators.required ]),
      complement: new FormControl(this.selectedAddress['complement'], [ Validators.required ]),
      state: new FormControl(this.selectedAddress['state'], [ Validators.required ]),
      city: new FormControl(this.selectedAddress['city'], [ Validators.required ]),
      district: new FormControl(this.selectedAddress['district'], [ Validators.required ]),
      zipcode: new FormControl(this.selectedAddress['zipcode'], [ Validators.required ]),
      is_main: new FormControl(this.selectedAddress['is_main'], [ Validators.required ]), 
    });
  }

  submitCustomer(ev: Event) {
    ev.preventDefault();
   
    let formData: Customer = {
      ...this.customerForm.getRawValue(),
    };

    formData.id = this.customer.id;

    let request$: Observable<Customer>;
    request$ = this.customerService.update(formData);
    request$.subscribe(_ => this.router.navigate(['/profile']))
  }

  submitAddress(ev: Event) {
    ev.preventDefault();
   
    let formData: Address = {
      ...this.addressForm.getRawValue(),
    };
    console.log(formData)

    let request$: Observable<Address>;
    request$ = this.addressService.create(this.customer.id, formData);
    request$.subscribe(_ => this.router.navigate(['/profile']))
  }


  selectAddress(address: Address, ev: Event) {
    ev.preventDefault();
    this.selectedAddress = address;
    console.log(this.selectedAddress)
  }

    /**
   * tenta buscar o campo com o field correto. Se falhar, fallback para string vazia
   * @param field
   * @returns
   */
     getFieldValue(field) {
      let value = '';
      try {
        value = this.customer[field];
      } catch (err) {
        console.warn('nao foi possivel encontrar o campo', field)
      }
  
      return value;
    }
}
