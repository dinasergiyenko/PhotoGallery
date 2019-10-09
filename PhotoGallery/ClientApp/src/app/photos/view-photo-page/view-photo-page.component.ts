import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '@core/services/authentication.service';
import { PhotoService } from '@core/services/photo.service';
import { Album } from '@app/albums/shared/album.model';
import { User } from '@app/users/shared/user.model';
import { Photo } from '@app/photos/shared/photo.model';

@Component({
  selector: 'pg-view-photo-page',
  templateUrl: './view-photo-page.component.html',
  styleUrls: ['./view-photo-page.component.scss']
})
export class ViewPhotoPageComponent implements OnInit {
  user: User;
  currentUser: User;
  photo: Photo;
  album: Album;

  constructor(
    private authenticationService: AuthenticationService,
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const photoId = params.get('id');

        this.photoService.getPage(photoId)
          .subscribe(photoPage => {
            this.photo = photoPage.photo;
            this.album = photoPage.album;
            this.user = photoPage.user;
          });

        this.authenticationService.currentUser
          .subscribe(
            user => {
              this.currentUser = user;
            }
          );
      });
  }

  isCurrentUser() {
    return this.currentUser && this.album && this.currentUser.id === this.album.userId;
  }

  removeAlbum(albumId: number) {
    this.router.navigate(['/user', this.album.userId]);
  }

  removePhoto(photoId: number) {
    this.router.navigate(['/album', this.photo.albumId]);
  }
}
