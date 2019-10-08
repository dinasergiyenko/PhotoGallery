import { Component } from '@angular/core';
import { PhotoService } from '@core/services/photo.service';
import { Photo } from 'src/app/photos/shared/photo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'pg-add-photo-page',
  templateUrl: './add-photo-page.component.html',
  styleUrls: ['./add-photo-page.component.scss']
})
export class AddPhotoPageComponent {
  photo = new Photo();
  loading = false;

  constructor(
    private photoService: PhotoService,
    private router: Router
  ) { }

  onSubmit(photo: Photo) {
    this.photoService.add(photo)
      .subscribe(
        albumId => {
          this.router.navigate(['/album', albumId]);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
