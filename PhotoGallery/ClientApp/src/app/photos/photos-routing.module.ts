import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPhotoPageComponent } from '@app/photos/add-photo-page/add-photo-page.component';
import { UpdatePhotoPageComponent } from '@app/photos/update-photo-page/update-photo-page.component';
import { ViewPhotoPageComponent } from '@app/photos/view-photo-page/view-photo-page.component';
import { AuthorizedGuard } from '@core/guards/authorized.guard';
import { UpdatePhotoGuard } from '@core/guards/update-photo.guard';

const routes: Routes = [
    { path: 'add', component: AddPhotoPageComponent, canActivate: [AuthorizedGuard] },
    { path: 'update/:id', component: UpdatePhotoPageComponent, canActivate: [AuthorizedGuard, UpdatePhotoGuard] },
    { path: ':id', component: ViewPhotoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PhotosRoutingModule { }
