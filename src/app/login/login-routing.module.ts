import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'home' , component: HomeComponent },
  { path : 'user-login',component:UserLoginComponent },
  { path : 'admin-login',component:AdminLoginComponent },
  { path : 'user-registration',component:UserRegistrationComponent },
  { path : 'user-verification/:phone',component:UserVerificationComponent },
  { path : 'forgot-password',component:ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
