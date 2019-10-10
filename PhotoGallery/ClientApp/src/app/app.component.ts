import { Component } from '@angular/core';

import { AuthenticationService } from '@core/services/authentication.service';
import { User } from '@app/users/shared/user.model';

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
    return this.authenticationService.isLogged();
  }
}
