import { Component, OnInit } from '@angular/core';
import { BffService } from 'src/app/shared/services/bff/bff.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public bffService: BffService) { }

  ngOnInit(): void {
  }

  public signin(e: Event, user: string, password: string) {
    e.preventDefault();
    this.bffService.SignIn(user, password);
  }
}
