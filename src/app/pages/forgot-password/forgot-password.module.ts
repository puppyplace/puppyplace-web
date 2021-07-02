import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { RecoverComponent } from './recover/recover.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password.component';


@NgModule({
  declarations: [RecoverComponent, ChangePasswordComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
