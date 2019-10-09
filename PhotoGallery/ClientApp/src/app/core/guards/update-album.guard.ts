import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AlbumService } from '@core/services/album.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateAlbumGuard implements CanActivate {
  constructor(
    private router: Router,
    private albumService: AlbumService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const albumId = route.params.id;

    return this.albumService.isCurrentUser(albumId)
      .pipe(
        catchError((err) => {
          this.router.navigate(['/']);
          return of(false);
        })
      );
  }
}
