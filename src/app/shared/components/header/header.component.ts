import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @ViewChild('content') modal: ElementRef;
  
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
  
  ) { }

  ngOnInit(): void {
  }
  
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((_) => {});
  }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  signOut(){
    this.authService.SignOut();
  }

  userRedirect(){
    let route = '/sign-in';

    if (this.isLoggedIn()){
      route = '/profile';
    }
    this.router.navigate([route])
  }

}
