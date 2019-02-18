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
import { NoAuthorizedGuard } from './guards/no-authorized.guard';
import { AuthorizedGuard } from './guards/authorized.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { AlbumService } from './services/album.service';
import { AlbumFormComponent } from './components/album-form/album-form.component';
import { UpdateAlbumComponent } from './components/update-album/update-album.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserService } from './services/user.service';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoService } from './services/photo.service';
import { UpdatePhotoComponent } from './components/update-photo/update-photo.component';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { PhotoPageComponent } from './components/photo-page/photo-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UpdateAlbumGuard } from './guards/update-album.guard';
import { UpdatePhotoGuard } from './guards/update-photo.guard';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentService } from './services/comment.service';

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
    UserPageComponent,
    AlbumCardComponent,
    AddPhotoComponent,
    PhotoFormComponent,
    UpdatePhotoComponent,
    AlbumPageComponent,
    PhotoCardComponent,
    UserCardComponent,
    PhotoPageComponent,
    HomePageComponent,
    LoadMoreComponent,
    AddCommentComponent
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
    NoAuthorizedGuard,
    AuthorizedGuard,
    UpdateAlbumGuard,
    UpdatePhotoGuard,
    AlbumService,
    UserService,
    PhotoService,
    CommentService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
