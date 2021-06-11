import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public showAlert: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showAlert = false;
  }

  recover(ev: Event) {
    ev.preventDefault();
    this.showAlert = true;
  }

}
