import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserPageComponent } from './view-user-page/view-user-page.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

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
