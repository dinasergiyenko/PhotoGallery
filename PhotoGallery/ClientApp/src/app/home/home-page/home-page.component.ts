import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@core/services/photo.service';
import { Photo } from 'src/app/photos/shared/photo.model';
import { AuthenticationService } from '@core/services/authentication.service';
import { User } from 'src/app/users/shared/user.model';
import { AppConfigService } from '@core/services/appConfig.service';

@Component({
  selector: 'pg-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currentUser: User;
  photos: Photo[];
  isLoadMoreDisplayed: boolean;

  constructor(
    private photoService: PhotoService,
    private authenticationServie: AuthenticationService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.authenticationServie.currentUser
      .subscribe(user =>
        this.currentUser = user
      );

    this.photoService.getPhotos(0, this.appConfigService.photosPageSize)
      .subscribe(photos => {
        this.photos = photos;
        this.isLoadMoreDisplayed = photos.length === this.appConfigService.photosPageSize;
      });
  }

  loadMore(pageNumber: number) {
    this.photoService.getPhotos(pageNumber, this.appConfigService.photosPageSize)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        this.isLoadMoreDisplayed = photos.length === this.appConfigService.photosPageSize;
      });
  }
}
