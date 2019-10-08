import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AppConfigService } from '@core/services/appConfig.service';
import { CustomMaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { PhotosModule } from './photos/photos.module';
import { AlbumsModule } from './albums/albums.module';
import { UsersModule } from './users/users.module';
import { AppComponent } from './app.component';

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
