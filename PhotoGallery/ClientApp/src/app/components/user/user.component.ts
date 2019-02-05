import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Album } from 'src/app/models/album';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
        this.userService.getUserPage(userId)
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

}
