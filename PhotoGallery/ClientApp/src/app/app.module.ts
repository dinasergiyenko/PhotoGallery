import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './material.module';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AlertComponent } from './components/alert/alert.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { AlbumService } from './services/album.service';
import { AlbumFormComponent } from './components/album-form/album-form.component';
import { UpdateAlbumComponent } from './components/update-album/update-album.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoService } from './services/photo.service';
import { UpdatePhotoComponent } from './components/update-photo/update-photo.component';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    LogoutComponent,
    AddAlbumComponent,
    AlbumFormComponent,
    UpdateAlbumComponent,
    UserComponent,
    AlbumCardComponent,
    AddPhotoComponent,
    PhotoFormComponent,
    UpdatePhotoComponent,
    AlbumPageComponent,
    PhotoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [
    AuthenticationService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard,
    AlbumService,
    UserService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
