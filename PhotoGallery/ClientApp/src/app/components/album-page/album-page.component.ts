import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Album } from 'src/app/models/album';
import { PhotoService } from 'src/app/services/photo.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent implements OnInit {
  private user: User;
  private currentUser: User;
  private photos: Photo[];
  private album: Album;

  constructor(
    private authenticationService: AuthenticationService,
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let albumId = params.get('id');

        this.albumService.getPage(albumId, 0, Constants.PHOTOS_PAGE_SIZE)
          .subscribe(albumPage => {
            this.album = albumPage.album;
            this.user = albumPage.user;
            this.photos = albumPage.photos;
          });

        this.authenticationService.currentUser
          .subscribe(user => {
            this.currentUser = user;
          });
      }
    )
  }

  isCurrentUser() {
    return this.currentUser && this.album && this.currentUser.id == this.album.userId;
  }

  removeAlbum(albumId: number) {
    this.router.navigate(['/user', this.album.userId]);
  }

  removePhoto(photoId: number) {
    this.photos = this.photos.filter(item => item.id != photoId);
  }

  isLoadMoreDisplayed() {
    return this.photos && this.photos.length != 0;
  }

  loadMore(pageNumber: number) {
    this.photoService.getByAlbum(this.album.id, pageNumber, Constants.PHOTOS_PAGE_SIZE)
      .subscribe(photos =>
        this.photos = this.photos.concat(photos)
      );
  }
}
