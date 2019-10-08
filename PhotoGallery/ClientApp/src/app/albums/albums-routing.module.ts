import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAlbumPageComponent } from 'src/app/albums/add-album-page/add-album-page.component';
import { UpdateAlbumPageComponent } from 'src/app/albums/update-album-page/update-album-page.component';
import { ViewAlbumPageComponent } from 'src/app/albums/view-album-page/view-album-page.component';
import { AuthorizedGuard } from '@core/guards/authorized.guard';
import { UpdateAlbumGuard } from '@core/guards/update-album.guard';

const routes: Routes = [
  { path: 'add-album', component: AddAlbumPageComponent, canActivate: [AuthorizedGuard] },
  { path: 'update-album/:id', component: UpdateAlbumPageComponent, canActivate: [AuthorizedGuard, UpdateAlbumGuard] },
  { path: 'album/:id', component: ViewAlbumPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlbumsRoutingModule { }
