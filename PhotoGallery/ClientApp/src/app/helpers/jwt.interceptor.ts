import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUser.value;

    if (currentUser && currentUser.token) {
      return next.handle(
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        })
      );
    }

    return next.handle(request);
  }
}
