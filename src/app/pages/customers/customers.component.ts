import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.interface';
import { Customer } from 'src/app/models/customer.interface';
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

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService
        .findByEmail("cliente@customer.com")
        .subscribe(result => {
          this.customer = result as Customer;
          
          this.initForm();
        //  this.initAddressForm();
    }, error => {
      console.log('error', error)
    })
  }

  initForm(): void {
    this.customerForm = new FormGroup({
      first_name: new FormControl(this.customer.name, [ Validators.required ]),
      last_name: new FormControl(null, [ Validators.required ]),
      document: new FormControl(this.customer.document, [ Validators.required ]),
      email: new FormControl(this.customer.email, [ Validators.required ]),
      cellphone: new FormControl(this.customer.cellphone),
      birthdate: new FormControl(this.customer.birthdate, [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ]),
    });
  }
  
  initAddressForm(): void {
    this.addressForm = new FormGroup({
      street: new FormControl(null, [ Validators.required ]),
      number: new FormControl(null, [ Validators.required ]),
      complement: new FormControl(null, [ Validators.required ]),
      state: new FormControl(null, [ Validators.required ]),
      district: new FormControl(null, [ Validators.required ]),
      zipcode: new FormControl(null, [ Validators.required ]),
    });
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
        console.warn('nao foi possivel encontrar este campo', field)
      }
  
      return value;
    }
}
