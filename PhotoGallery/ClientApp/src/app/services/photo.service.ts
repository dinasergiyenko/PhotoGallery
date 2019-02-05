import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/photo';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';
import { PhotoPage } from '../models/photoPage';

@Injectable()
export class PhotoService {
    private user: User;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(
            user => this.user = user
        )
    }


    add(photo: Photo) {
        let formData = new FormData();
        formData.append("file", photo.file);
        formData.append("title", photo.title);
        formData.append("albumId", photo.albumId.toString());
        formData.append("userId", this.user.id.toString())

        if (photo.description) {
            formData.append("description", photo.description);
        }

        return this.http.post('/api/Photo/Add', formData);
    }

    get(id: string) {
        let params = { params: new HttpParams().set('id', id) };

        return this.http.get<Photo>('/api/Photo/Get', params)
    }

    getPhotoPage(id: string) {
        let params = { params: new HttpParams().set('id', id) };

        return this.http.get<PhotoPage>('/api/Photo/GetPhotoPage', params);
    }

    getByAlbum(albumId: string) {
        let params = { params: new HttpParams().set('albumId', albumId) };

        return this.http.get<Photo[]>('/api/Photo/GetByAlbum', params)
    }

    update(photo: Photo) {
        return this.http.post('/api/Photo/Update', {
            id: photo.id,
            title: photo.title,
            description: photo.description,
            albumId: photo.albumId,
            userId: this.user.id
        })
    }
}