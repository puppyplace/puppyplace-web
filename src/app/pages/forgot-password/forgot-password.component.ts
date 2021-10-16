import { Component, OnInit } from '@angular/core';
import { BffService } from 'src/app/shared/services/bff/bff.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public showAlert: boolean;

  constructor(
    public bffService: BffService
  ) { }

  ngOnInit(): void {
    this.showAlert = false;
  }

  forgotPassword(password) {
    this.bffService.ForgotPassword(password);
  }

  recover(ev: Event) {
    ev.preventDefault();
    this.showAlert = true;
  }

}
