import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public showAlert: boolean;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showAlert = false;
  }

  recover(ev: Event) {
    ev.preventDefault();
    this.showAlert = true;
  }

}
