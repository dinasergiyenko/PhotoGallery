import { Component } from '@angular/core';

import { AuthenticationService } from '@core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pg-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
