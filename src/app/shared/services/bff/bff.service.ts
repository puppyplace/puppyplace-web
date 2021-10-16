import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BffService implements OnInit {
  public userData: any; // Save logged in user data

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected ngZone: NgZone,
    protected router: Router
  ) { }
  
  ngOnInit(): void {
    console.log(this.isLoggedIn);
    
    if (!this.isLoggedIn) {
      localStorage.setItem('user', null);
    }
  }

  public SignIn(email, password) {
    return (this.http.post(`${environment.BFF_FIREBASE}/sign-in`, 
    { email, password }) as Observable<any>).toPromise()
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      this.authService.SetUserData(result);
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  public GetUser(): any {
    return this.authService.GetUser();
  }

  public SignUp(email, password) {
    return (this.http.post(`${environment.BFF_FIREBASE}/sign-up`, 
      { email, password }) as Observable<any>).toPromise()
      .then((result) => {

        this.SendVerificationMail(result.idToken);
        this.authService.SetUserData(result);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  public ForgotPassword(email) {
    return (this.http.post(`${environment.BFF_FIREBASE}/reset-password`, 
      { email }) as Observable<any>).toPromise()
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  public async SendVerificationMail(idToken) {
    await (this.http.post(`${environment.BFF_FIREBASE}/verification`, 
      { idToken }) as Observable<any>).toPromise();
  }

  public SignOut() {
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }
}
