import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Photo } from 'src/app/models/photo.model';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Album } from 'src/app/models/album.model';
import { PhotoService } from 'src/app/services/photo.service';
import { AppConfigService } from 'src/app/services/appConfig.service';

@Component({
  selector: 'pg-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent implements OnInit {
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
    this.photoService.getByAlbum(this.album.id, pageNumber, this.appConfigService.photosPageSize)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        this.isLoadMoreDisplayed = photos.length === this.appConfigService.photosPageSize;
      });
  }
}
