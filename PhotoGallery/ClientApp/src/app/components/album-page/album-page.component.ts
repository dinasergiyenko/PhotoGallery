import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
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
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let albumId = params.get('id');

        this.albumService.getPage(albumId, 0, 0)
          .subscribe(albumPage => {
            this.album = albumPage.album;
            this.user = albumPage.user;
            this.photos = albumPage.photos;
          });

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
