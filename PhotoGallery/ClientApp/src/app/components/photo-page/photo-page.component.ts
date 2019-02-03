import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Album } from 'src/app/models/album';
import { PhotoService } from 'src/app/services/photo.service';
import { AlbumService } from 'src/app/services/album.service';
import { UserService } from 'src/app/services/user.service';
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
    private albumService: AlbumService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let photoId = params.get('id');

        this.photoService.get(photoId).subscribe(
          photo => {
            this.photo = photo;
            this.albumService.get(this.photo.albumId.toString()).subscribe(
              album => {
                this.album = album;
                this.userService.get(this.album.userId.toString()).subscribe(
                  user => {
                    this.user = user;
                  }
                )
              }
            )
          }
        )

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
