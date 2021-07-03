import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PAW_DATA } from 'src/app/mocks/paw-data.mock';
import { Address } from 'src/app/models/address.interface';
import { Customer } from 'src/app/models/customer.interface';
import { Paw } from 'src/app/models/paw.interface';
import { AddressService } from 'src/app/shared/services/address.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})




export class CustomersComponent implements OnInit {
  
    cleanAddress : Address = {
      id: '',
      street: '',
      number: 0,
      complement: '',
      city: '',
      district: '',
      is_main: false,
      state: '',
      zipcode: ''
    }
  
    cleanCustomer: Customer = {
      id: '',
      first_name: '',
      last_name: '',
      document: '',
      email: '',
      cellphone: '',
      birthdate: null,
      password: '',
      is_active: null,
  }

  public customerForm: FormGroup;
  public addressForm: FormGroup;
  public customer: Customer;
  public addresses: Address[];
  public selectedAddress : Address;
  paws:Array<Paw>;

  constructor(
    private customerService: CustomerService,
    private addressService: AddressService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.paws = PAW_DATA;
    const userLogged =  this.authService.GetUser();

    this.selectedAddress = this.cleanAddress;
    this.customer = this.cleanCustomer;

    this.customerService
        .findByEmail(userLogged.email)
        .subscribe(result => {
          this.customer = result as Customer;
          this.addresses = this.customer.addresses;

          const mainAddress = this.addresses.find(address => address.is_main) as Address;

          if(mainAddress) this.selectedAddress = mainAddress;

         this.initForm();
         this.updateAddressForm();
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
  
  updateAddressForm(): void {
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

  getAddressFormData = () => {
    return {
      ...this.addressForm.getRawValue(),
    } as Address;
  }

  clearAddress() {
    this.selectedAddress = this.cleanAddress;
    this.updateAddressForm();
  }

  submitAddress(ev: Event) {
    ev.preventDefault();
   
    let formData: Address = this.getAddressFormData();
    
    let request$: Observable<Address>;

    request$ = formData.id ?
               this.addressService.update(this.customer.id, formData) :
               this.addressService.create(this.customer.id, formData);


    request$.subscribe(result => {

      const index = this.addresses.findIndex(ad => ad.id === result.id);
     
      (index >= 0) ?
        this.addresses[index] = result
      :
        this.addresses.push(result);

      }, error => {
        console.log('error', error)
      })
  }

  removeAddress(addressID: string, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    this.addressService.delete(this.customer.id, addressID).subscribe(result => {

      const index = this.addresses.findIndex(ad => ad.id === result);
      this.addresses.splice(index, 1);

      }, error => {
        console.log('error', error)
      });
  }

  selectAddress(address: Address, ev: Event) {
    ev.preventDefault();
    this.selectedAddress = address;
    this.updateAddressForm();
  }

  makeMain(addressID: string, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    this.addressService.makeMain(this.customer.id, addressID).subscribe(result => {

      this.addresses.forEach(address => address.is_main = address.id === result? true : false);

      }, error => {
        console.log('error', error)
      });;
  }

}
