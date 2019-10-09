import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddPhotoPageComponent } from '@app/photos/add-photo-page/add-photo-page.component';
import { PhotoFormComponent } from '@app/photos/photo-form/photo-form.component';
import { UpdatePhotoPageComponent } from '@app/photos/update-photo-page/update-photo-page.component';
import { ViewPhotoPageComponent } from '@app/photos/view-photo-page/view-photo-page.component';
import { PhotosRoutingModule } from '@app/photos/photos-routing.module';
import { CommentsModule } from '@app/comments/comments.module';
import { SharedModule } from '@app/shared/shared.module';

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
