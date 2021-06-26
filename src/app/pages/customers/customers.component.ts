import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup;
  public addressForm: FormGroup;
  public customer: Customer;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.initAddressForm();
  }

  initForm(): void {
    this.customerForm = new FormGroup({
      first_name: new FormControl(null, [ Validators.required ]),
      last_name: new FormControl(null, [ Validators.required ]),
      document: new FormControl(null, [ Validators.required ]),
      email: new FormControl(null, [ Validators.required ]),
      cellphone: new FormControl(null),
      birthdate: new FormControl(null, [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ]),
    });
  }

  initAddressForm(): void {
    this.addressForm = new FormGroup({
      first_name: new FormControl(null, [ Validators.required ]),
      last_name: new FormControl(null, [ Validators.required ]),
      document: new FormControl(null, [ Validators.required ]),
      email: new FormControl(null, [ Validators.required ]),
      cellphone: new FormControl(null),
      birthdate: new FormControl(null, [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ]),
    });
  }
}
