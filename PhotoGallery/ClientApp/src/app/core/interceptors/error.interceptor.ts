import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
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