import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/app.config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get albumsPageSize() {
    if (!this.appConfig) { return null; }

    return this.appConfig.albumsPageSize;
  }

  get photosPageSize() {
    if (!this.appConfig) { return null; }

    return this.appConfig.photosPageSize;
  }

  get commentsPageSize() {
    if (!this.appConfig) { return null; }

    return this.appConfig.commentsPageSize;
  }

  get dateDisplayFormat() {
    if (!this.appConfig) { return null; }

    return this.appConfig.dateDisplayFormat;
  }
}
