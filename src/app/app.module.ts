import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
