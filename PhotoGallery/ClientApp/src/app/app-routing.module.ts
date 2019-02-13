import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NoAuthorizedGuard } from './guards/no-authorized.guard';
import { AuthorizedGuard } from './guards/authorized.guard';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { UpdateAlbumComponent } from './components/update-album/update-album.component';
import { UserComponent } from './components/user/user.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { UpdatePhotoComponent } from './components/update-photo/update-photo.component';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { PhotoPageComponent } from './components/photo-page/photo-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthorizedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthorizedGuard] },
  { path: 'add-album', component: AddAlbumComponent, canActivate: [AuthorizedGuard] },
  { path: 'update-album/:id', component: UpdateAlbumComponent, canActivate: [AuthorizedGuard] },
  { path: 'user/:id', component: UserComponent },
  { path: 'add-photo', component: AddPhotoComponent, canActivate: [AuthorizedGuard] },
  { path: 'update-photo/:id', component: UpdatePhotoComponent, canActivate: [AuthorizedGuard] },
  { path: 'album/:id', component: AlbumPageComponent },
  { path: 'photo/:id', component: PhotoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
