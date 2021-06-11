import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
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
