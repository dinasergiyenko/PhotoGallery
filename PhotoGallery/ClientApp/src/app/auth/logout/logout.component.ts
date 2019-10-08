import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'pg-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  logout() {
    this.authenticationService.logout();
  }
}
