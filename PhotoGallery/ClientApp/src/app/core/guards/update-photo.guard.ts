import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PhotoService } from '../services/photo.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatePhotoGuard implements CanActivate {
  constructor(
    private router: Router,
    private photoService: PhotoService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const photoId = route.params.id;

    return this.photoService.isCurrentUser(photoId)
      .pipe(
        catchError((err) => {
          this.router.navigate(['/']);
          return of(false);
        })
      );
  }
}
