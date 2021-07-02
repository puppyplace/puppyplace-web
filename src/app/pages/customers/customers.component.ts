import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address.interface';
import { Customer } from 'src/app/models/customer.interface';
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
  private customerId: string;
  public customer: Customer;
  public selectedAddress : Address;


  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const userLogged =  this.authService.GetUser();

    this.customerService
        .findByEmail(userLogged.email)
        .subscribe(result => {
          this.customer = result as Customer;
          console.log('init', this.customer)
          this.initForm();
         this.initAddressForm();
    }, error => {
      console.log('error', error)
    })
  }



  initForm(): void {
    this.customerForm = new FormGroup({
      first_name: new FormControl(this.getFieldValue('first_name'), [ Validators.required ]),
      last_name: new FormControl(this.getFieldValue('last_name'), [ Validators.required ]),
      document: new FormControl(this.getFieldValue('document'), [ Validators.required ]),
      email: new FormControl(this.getFieldValue('email'), [ Validators.required ]),
      cellphone: new FormControl(this.getFieldValue('cellphone')),
      birthdate: new FormControl(this.getFieldValue('birthdate'), [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ]),
    });
  }
  
  initAddressForm(): void {
    this.addressForm = new FormGroup({
      street: new FormControl(null, [ Validators.required ]),
      number: new FormControl(null, [ Validators.required ]),
      complement: new FormControl(null, [ Validators.required ]),
      state: new FormControl(null, [ Validators.required ]),
      city: new FormControl(null, [ Validators.required ]),
      district: new FormControl(null, [ Validators.required ]),
      zipcode: new FormControl(null, [ Validators.required ]),
    });
  }

  submitCustomer(ev: Event) {
    ev.preventDefault();
    console.log('this.customer',this.customer)
   
    let formData: Customer = {
      ...this.customerForm.getRawValue(),
    };

    formData.id = this.customer.id;

    let request$: Observable<Customer>;
    request$ = this.customerService.update(formData);
    // // faz o request e manda para a tela de produtos
    request$.subscribe(_ => this.router.navigate(['/profile']))
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
