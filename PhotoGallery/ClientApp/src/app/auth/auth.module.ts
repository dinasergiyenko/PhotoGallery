import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from '@app/auth/login/login.component';
import { LogoutComponent } from '@app/auth/logout/logout.component';
import { RegisterComponent } from '@app/auth/register/register.component';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { SharedModule } from '@app/shared/shared.module';

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
