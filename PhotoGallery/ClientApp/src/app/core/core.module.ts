import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { JwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { AlertComponent } from '@core/components/alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  exports: [
    AlertComponent
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
 }
