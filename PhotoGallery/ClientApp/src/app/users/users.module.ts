import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ViewUserPageComponent } from '@app/users/view-user-page/view-user-page.component';
import { UsersRoutingModule } from '@app/users/users-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ViewUserPageComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [],
  exports: []
})

export class UsersModule { }
