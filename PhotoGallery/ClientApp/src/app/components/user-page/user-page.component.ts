import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Album } from 'src/app/models/album';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  private currentUser: User;
  private user: User;
  private albums: Album[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let userId = params.get('id');
        this.userService.getPage(userId, 0, 0)
          .subscribe(userPage => {
            this.user = userPage.user;
            this.albums = userPage.albums
          })

        this.authenticationService.currentUser.subscribe(
          user => this.currentUser = user
        )
      }
    )
  }

  isCurrentUser(albumUserId: number){
    return this.currentUser && this.currentUser.id == albumUserId;
  }

  remove(albumId: number){
    this.albums = this.albums.filter(item => item.id != albumId);
  }
}
