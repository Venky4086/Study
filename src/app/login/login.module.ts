import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MatSharedModule } from '../common/mat-shared/mat-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
SwiperCore.use([Autoplay, Pagination, Navigation]);


@NgModule({
  declarations: [
    LoginComponent,
    UserLoginComponent, 
    UserRegistrationComponent, UserVerificationComponent, ForgotPasswordComponent, AdminLoginComponent, HomeComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSharedModule,
    SwiperModule
  ]
})
export class LoginModule { }
