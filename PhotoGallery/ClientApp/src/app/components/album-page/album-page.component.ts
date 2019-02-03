import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent implements OnInit {

  private user: User;
  //private isCurrentUser: boolean;
  private currentUser: User;
  private photos: Photo[];
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
        let albumId = params.get('id');

        this.albumService.get(albumId).subscribe(
          album => {
            this.album = album;
            this.userService.get(this.album.userId.toString()).subscribe(
              user => {
                this.user = user;
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

        this.photoService.getByAlbum(albumId).subscribe(
          photos => this.photos = photos
        )
      }
    )
  }

  isCurrentUser() {
    return this.currentUser && this.album && this.currentUser.id == this.album.userId;
  }
}
