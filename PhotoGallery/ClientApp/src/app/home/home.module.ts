import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorPageComponent } from '../home/error-page/error-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

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
