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

    getPage(id: string) {
        let params = { params: new HttpParams().set('id', id) };

        return this.http.get<PhotoPage>('/api/Photo/GetPage', params);
    }

    getPhotos(pageNumber: number, pageSize: number) {
        let params = { params: new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString()) };

        return this.http.get<Photo[]>('/api/Photo/GetPhotos', params)
    }

    getByAlbum(albumId: number, pageNumber: number, pageSize: number){
        let params = { params: new HttpParams()
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
        })
    }

    isCurrentUser(photoId: string){
        let params = { params: new HttpParams().set('photoId', photoId) }

        return this.http.get<boolean>('/api/Photo/IsCurrentPhotoUser', params);
    }

    remove(photoId: number){
        return this.http.post<number>('/api/Photo/Remove', photoId);
    }
}