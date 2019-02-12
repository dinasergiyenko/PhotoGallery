import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currentUser: User;
  photos: Photo[];
  pageNumber = 0;

  constructor(
    private photoService: PhotoService,
    private authenticationServie: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationServie.currentUser
      .subscribe(user => 
        this.currentUser = user);

    this.photoService.getPhotos(this.pageNumber, 8)
      .subscribe(photos => {
        this.photos = photos;
      });
  }

  uploadNewPage(){
    this.pageNumber += 1;
    this.photoService.getPhotos(this.pageNumber, 8)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
      })
  }

}
