import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Album } from 'src/app/models/album.model';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlbumService } from 'src/app/services/album.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'pg-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  currentUser: User;
  user: User;
  albums: Album[];
  isLoadMoreDisplayed: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const userId = params.get('id');

        this.userService.getPage(userId, 0, Constants.ALBUMS_PAGE_SIZE)
          .subscribe(userPage => {
            this.user = userPage.user;
            this.albums = userPage.albums;
            this.isLoadMoreDisplayed = userPage.albums.length === Constants.ALBUMS_PAGE_SIZE;
          });

        this.authenticationService.currentUser.subscribe(
          user => this.currentUser = user
        );
      });
  }

  isCurrentUser(albumUserId: number) {
    return this.currentUser && this.currentUser.id === albumUserId;
  }

  remove(albumId: number) {
    this.albums = this.albums.filter(item => item.id !== albumId);
  }

  loadMore(pageNumber: number) {
    this.albumService.getByUser(this.user.id, pageNumber, Constants.ALBUMS_PAGE_SIZE)
      .subscribe(albums => {
        this.albums = this.albums.concat(albums);
        this.isLoadMoreDisplayed = albums.length === Constants.ALBUMS_PAGE_SIZE;
      });
  }
}
