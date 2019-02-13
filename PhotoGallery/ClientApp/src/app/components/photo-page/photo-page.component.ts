import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Album } from 'src/app/models/album';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent implements OnInit {
  private user: User;
  //private isCurrentUser: boolean;
  private currentUser: User;
  private photo: Photo;
  private album: Album;

  constructor(
    private authenticationService: AuthenticationService,
    private photoService: PhotoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let photoId = params.get('id');

        this.photoService.getPage(photoId)
          .subscribe(photoPage => {
            this.photo = photoPage.photo;
            this.album = photoPage.album;
            this.user = photoPage.user;
          })

        this.authenticationService.currentUser
          .subscribe(
            user => {
              this.currentUser = user;
              //this.isCurrentUser = this.currentUser.id == this.album.userId;
            }
          )
      }
    )
  }

  isCurrentUser() {
    return this.currentUser && this.album && this.currentUser.id == this.album.userId;
  }

}
