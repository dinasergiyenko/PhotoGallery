import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '@core/services/authentication.service';
import { Album } from '@app/albums/shared/album.model';
import { AlbumPage } from '@app/albums/shared/album-page.model';
import { User } from '@app/users/shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private currentUser: User;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser
      .subscribe(user =>
        this.currentUser = user
      );
  }

  add(title: string, description: string) {
    const userId = this.currentUser.id;

    return this.http.post('/api/Album/Add', { title, description, userId });
  }

  get(id: string) {
    const params = { params: new HttpParams().set('id', id) };

    return this.http.get<Album>('/api/Album/Get', params);
  }

  getPage(id: string, photosPageNumber = 0, photosPageSize = 0) {
    const params = {
      params: new HttpParams()
        .set('id', id)
        .set('photosPageNumber', photosPageNumber.toString())
        .set('photosPageSize', photosPageSize.toString())
    };

    return this.http.get<AlbumPage>('/api/Album/GetPage', params);
  }

  getByUser(userId: number, pageNumber: number = 0, pageSize: number = 0) {
    const params = {
      params: new HttpParams()
        .set('userId', userId.toString())
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    };

    return this.http.get<Album[]>('/api/Album/GetByUser', params);
  }

  update(album: Album) {
    return this.http.post('/api/Album/Update', album);
  }

  isCurrentUser(albumId: string) {
    const params = { params: new HttpParams().set('albumId', albumId) };

    return this.http.get<boolean>('/api/Album/IsCurrentAlbumUser', params);
  }

  remove(albumId: number) {
    return this.http.post<number>('/api/Album/Remove', albumId);
  }
}
