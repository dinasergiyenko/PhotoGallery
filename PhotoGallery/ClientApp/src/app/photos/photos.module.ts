import { NgModule } from '@angular/core';
import { AddPhotoPageComponent } from './add-photo-page/add-photo-page.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { UpdatePhotoPageComponent } from './update-photo-page/update-photo-page.component';
import { ViewPhotoPageComponent } from './view-photo-page/view-photo-page.component';
import { PhotosRoutingModule } from './photos-routing.module';
import { CommonModule } from '@angular/common';
import { CommentsModule } from '../comments/comments.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddPhotoPageComponent,
    PhotoFormComponent,
    UpdatePhotoPageComponent,
    ViewPhotoPageComponent,
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    CommentsModule,
    SharedModule
  ],
  providers: [],
  exports: []
})

export class PhotosModule { }
