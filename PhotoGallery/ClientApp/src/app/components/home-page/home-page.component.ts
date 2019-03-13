import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'pg-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currentUser: User;
  photos: Photo[];

  constructor(
    private photoService: PhotoService,
    private authenticationServie: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationServie.currentUser
      .subscribe(user =>
        this.currentUser = user
      );

    this.photoService.getPhotos(0, Constants.PHOTOS_PAGE_SIZE)
      .subscribe(photos => {
        this.photos = photos;
      });
  }

  loadMore(pageNumber: number) {
    this.photoService.getPhotos(pageNumber, Constants.PHOTOS_PAGE_SIZE)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
      });
  }

  isLoadMoreDisplayed() {
    return this.photos && this.photos.length !== 0;
  }
}
