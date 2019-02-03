import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { UpdateAlbumComponent } from './components/update-album/update-album.component';
import { UserComponent } from './components/user/user.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { UpdatePhotoComponent } from './components/update-photo/update-photo.component';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { PhotoPageComponent } from './components/photo-page/photo-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'add-album', component: AddAlbumComponent },
  { path: 'update-album/:id', component: UpdateAlbumComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'add-photo', component: AddPhotoComponent },
  { path: 'update-photo/:id', component: UpdatePhotoComponent },
  { path: 'album/:id', component: AlbumPageComponent },
  { path: 'photo/:id', component: PhotoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
