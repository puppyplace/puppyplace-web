import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
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
}
