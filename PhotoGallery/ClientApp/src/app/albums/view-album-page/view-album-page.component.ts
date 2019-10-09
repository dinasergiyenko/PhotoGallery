import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlbumService } from '@core/services/album.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { AppConfigService } from '@core/services/appConfig.service';
import { PhotoService } from '@core/services/photo.service';
import { Album } from '@app/albums/shared/album.model';
import { User } from '@app/users/shared/user.model';
import { Photo } from '@app/photos/shared/photo.model';

@Component({
  selector: 'pg-view-album-page',
  templateUrl: './view-album-page.component.html',
  styleUrls: ['./view-album-page.component.scss']
})
export class ViewAlbumPageComponent implements OnInit {
  user: User;
  currentUser: User;
  photos: Photo[];
  album: Album;
  isLoadMoreDisplayed: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const albumId = params.get('id');

        this.albumService.getPage(albumId, 0, this.appConfigService.photosPageSize)
          .subscribe(albumPage => {
            this.album = albumPage.album;
            this.user = albumPage.user;
            this.photos = albumPage.photos;
            this.isLoadMoreDisplayed = this.photos.length === this.appConfigService.photosPageSize;
          });

        this.authenticationService.currentUser
          .subscribe(user => {
            this.currentUser = user;
          });
      }
    );
  }

  isCurrentUser() {
    return this.currentUser && this.album && this.currentUser.id === this.album.userId;
  }

  removeAlbum(albumId: number) {
    this.router.navigate(['/user', this.album.userId]);
  }

  removePhoto(photoId: number) {
    this.photos = this.photos.filter(item => item.id !== photoId);
  }

  loadMore(pageNumber: number) {
    /*this.photoService.getByAlbum(this.album.id, pageNumber, this.appConfigService.photosPageSize)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        this.isLoadMoreDisplayed = photos.length === this.appConfigService.photosPageSize;
      });*/
  }
}
