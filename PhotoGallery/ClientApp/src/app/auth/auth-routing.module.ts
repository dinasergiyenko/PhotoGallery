import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@app/auth/login/login.component';
import { RegisterComponent } from '@app/auth/register/register.component';
import { NoAuthorizedGuard } from '@core/guards/no-authorized.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthorizedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthorizedGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
