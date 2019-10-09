import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddAlbumPageComponent } from '@app/albums/add-album-page/add-album-page.component';
import { AlbumFormComponent } from '@app/albums/album-form/album-form.component';
import { UpdateAlbumPageComponent } from '@app/albums/update-album-page/update-album-page.component';
import { ViewAlbumPageComponent } from '@app/albums/view-album-page/view-album-page.component';
import { AlbumsRoutingModule } from '@app/albums/albums-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AddAlbumPageComponent,
    AlbumFormComponent,
    UpdateAlbumPageComponent,
    ViewAlbumPageComponent,
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    SharedModule
  ],
  providers: [],
  exports: []
})

export class AlbumsModule { }
