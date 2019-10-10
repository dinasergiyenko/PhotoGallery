import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AlertService } from '@core/services/alert.service';
import { AuthenticationService } from '@core/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.status === 400) {
            this.alertService.alert.next(err.error);

            return throwError(err);
          }

          if (err.status === 401) {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
          }

          this.router.navigate(['/error']);

          return throwError(err);
        })
      );
  }
}
