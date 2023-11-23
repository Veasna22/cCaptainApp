import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VerifyComponent } from './component/verify/verify.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './component/customer/customer.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { CustomersComponent } from './component/customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ResetpasswordComponent,
    CustomerComponent,
    ProfileComponent,
    HomeComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
