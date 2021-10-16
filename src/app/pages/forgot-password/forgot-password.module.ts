import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { RecoverComponent } from './recover/recover.component';


@NgModule({
  declarations: [RecoverComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
