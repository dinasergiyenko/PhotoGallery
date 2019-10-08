import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUser.value;

    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
