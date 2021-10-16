import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BffService } from 'src/app/shared/services/bff/bff.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  public showAlert: boolean;

  constructor(
    public bffService: BffService
  ) { }

  ngOnInit(): void {
    this.showAlert = false;
  }

  recover(ev: Event) {
    ev.preventDefault();
    this.showAlert = true;
  }

}
