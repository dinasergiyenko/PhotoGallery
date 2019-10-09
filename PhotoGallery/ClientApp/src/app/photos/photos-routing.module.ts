import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '@core/guards/authorized.guard';
import { UpdatePhotoGuard } from '@core/guards/update-photo.guard';
import { AddPhotoPageComponent } from '@app/photos/add-photo-page/add-photo-page.component';
import { ViewPhotoPageComponent } from '@app/photos/view-photo-page/view-photo-page.component';
import { UpdatePhotoPageComponent } from '@app/photos/update-photo-page/update-photo-page.component';

const routes: Routes = [
    { path: 'add-photo', component: AddPhotoPageComponent, canActivate: [AuthorizedGuard] },
    { path: 'update-photo/:id', component: UpdatePhotoPageComponent, canActivate: [AuthorizedGuard, UpdatePhotoGuard] },
    { path: 'photo/:id', component: ViewPhotoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PhotosRoutingModule { }
