import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PhotoService } from '@core/services/photo.service';
import { Photo } from '@app/photos/shared/photo.model';

@Component({
  selector: 'pg-update-photo-page',
  templateUrl: './update-photo-page.component.html',
  styleUrls: ['./update-photo-page.component.scss']
})
export class UpdatePhotoPageComponent implements OnInit {
  photo: Photo;
  loading = false;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');

        this.photoService.get(id)
          .subscribe(photo => {
            this.photo = photo;
          });
      });
  }

  onSubmit(photo: Photo) {
    this.photoService.update(photo)
      .subscribe(
        photoId => {
            this.router.navigate(['/photo', photoId]);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
