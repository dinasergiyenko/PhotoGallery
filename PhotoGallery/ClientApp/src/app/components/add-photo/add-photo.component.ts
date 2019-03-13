import { Component } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent {
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
