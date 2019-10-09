import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthenticationService } from '@core/services/authentication.service';
import { Photo } from '@app/photos/shared/photo.model';
import { PhotoPage } from '@app/photos/shared/photo-page.model';
import { User } from '@app/users/shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private user: User;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      user => this.user = user
    );
  }

  add(photo: Photo) {
    const formData = new FormData();
    formData.append('file', photo.file);
    formData.append('title', photo.title);
    formData.append('albumId', photo.albumId.toString());
    formData.append('userId', this.user.id.toString());

    if (photo.description) {
      formData.append('description', photo.description);
    }

    return this.http.post('/api/Photo/Add', formData);
  }

  get(id: string) {
    const params = { params: new HttpParams().set('id', id) };

    return this.http.get<Photo>('/api/Photo/Get', params);
  }

  getPage(id: string) {
    const params = { params: new HttpParams().set('id', id) };

    return this.http.get<PhotoPage>('/api/Photo/GetPage', params);
  }

  getPhotos(pageNumber: number, pageSize: number) {
    const params = {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    };

    return this.http.get<Photo[]>('/api/Photo/GetPhotos', params);
  }

  getByAlbum(albumId: number, pageNumber: number, pageSize: number) {
    const params = {
      params: new HttpParams()
        .set('albumId', albumId.toString())
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    };

    return this.http.get<Photo[]>('/api/Photo/GetByAlbum', params);
  }

  update(photo: Photo) {
    return this.http.post('/api/Photo/Update', {
      id: photo.id,
      title: photo.title,
      description: photo.description,
      albumId: photo.albumId,
      userId: this.user.id
    });
  }

  isCurrentUser(photoId: string) {
    const params = { params: new HttpParams().set('photoId', photoId) };

    return this.http.get<boolean>('/api/Photo/IsCurrentPhotoUser', params);
  }

  remove(photoId: number) {
    return this.http.post<number>('/api/Photo/Remove', photoId);
  }
}
