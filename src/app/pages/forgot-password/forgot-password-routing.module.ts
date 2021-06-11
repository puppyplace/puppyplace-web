import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoverComponent } from './recover/recover.component';


const routes: Routes = [
  { path: '', component: RecoverComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
