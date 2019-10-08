import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [],
  exports: [
    LogoutComponent
  ]
})

export class AuthModule { }
