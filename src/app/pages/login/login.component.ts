import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showAlert: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showAlert = false;
  }

  login(ev: Event) {
    ev.preventDefault();
    this.showAlert = true;
  }

}
