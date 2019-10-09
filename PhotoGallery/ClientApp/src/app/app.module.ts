import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { AppConfigService } from '@core/services/appConfig.service';
import { AppRoutingModule } from '@app/app-routing.module';
import { CustomMaterialModule } from '@app/material/material.module';
import { AuthModule } from '@app/auth/auth.module';
import { PhotosModule } from '@app/photos/photos.module';
import { AlbumsModule } from '@app/albums/albums.module';
import { UsersModule } from '@app/users/users.module';
import { AppComponent } from '@app/app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    CoreModule,
    AuthModule,
    AlbumsModule,
    PhotosModule,
    UsersModule,
    RouterModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
