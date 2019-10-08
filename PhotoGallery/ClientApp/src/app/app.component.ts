import { Component } from '@angular/core';
import { User } from 'src/app/users/shared/user.model';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'pg-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  isLogged() {
    return this.currentUser !== null;
  }
}