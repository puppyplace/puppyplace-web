import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BffService } from 'src/app/shared/services/bff/bff.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  public signUpForm: FormGroup;
  public customer: Customer;

  constructor(
     public bffService: BffService,
     private customerService: CustomerService,
     private router: Router
     ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(this.getFieldValue('email'), [ Validators.required ]),
      password: new FormControl(this.getFieldValue('password'), [ Validators.required ]),
    });
  }

  submit(ev: Event) {
    ev.preventDefault();
    console.log('this.customer',this.customer)
   
    let formData: Customer = {
      ...this.signUpForm.getRawValue(),
    };
    console.log('formData',formData)

    this.bffService.SignUp(formData.email, formData.password)

    let request$: Observable<Customer>;
   
    request$ = this.customerService.create(formData);
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
