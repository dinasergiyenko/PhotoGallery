import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlbumService } from '@core/services/album.service';
import { AppConfigService } from '@core/services/appConfig.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { UserService } from '@core/services/user.service';
import { Album } from '@app/albums/shared/album.model';
import { User } from '@app/users/shared/user.model';

@Component({
  selector: 'pg-view-user-page',
  templateUrl: './view-user-page.component.html',
  styleUrls: ['./view-user-page.component.scss']
})
export class ViewUserPageComponent implements OnInit {
  currentUser: User;
  user: User;
  albums: Album[];
  isLoadMoreDisplayed: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private albumService: AlbumService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const userId = params.get('id');

        this.userService.getPage(userId, 0, this.appConfigService.albumsPageSize)
          .subscribe(userPage => {
            this.user = userPage.user;
            this.albums = userPage.albums;
            this.isLoadMoreDisplayed = userPage.albums.length === this.appConfigService.albumsPageSize;
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
    this.albumService.getByUser(this.user.id, pageNumber, this.appConfigService.albumsPageSize)
      .subscribe(albums => {
        this.albums = this.albums.concat(albums);
        this.isLoadMoreDisplayed = albums.length === this.appConfigService.albumsPageSize;
      });
  }
}
