import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomePageComponent } from '@app/home/home-page/home-page.component';
import { ErrorPageComponent } from '@app/home/error-page/error-page.component';
import { HomeRoutingModule } from '@app/home/home-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: []
})

export class HomeModule { }
