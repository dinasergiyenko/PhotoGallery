import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule) },
  { path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: '', loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule)  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
