import { NgModule } from '@angular/core';
import { AddAlbumPageComponent } from './add-album-page/add-album-page.component';
import { AlbumFormComponent } from './album-form/album-form.component';
import { UpdateAlbumPageComponent } from './update-album-page/update-album-page.component';
import { ViewAlbumPageComponent } from './view-album-page/view-album-page.component';
import { AlbumsRoutingModule } from './albums-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

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
