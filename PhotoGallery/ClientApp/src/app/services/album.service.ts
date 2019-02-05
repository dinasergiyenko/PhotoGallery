import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Album } from '../models/album';
import { AlbumPage } from '../models/albumPage';

@Injectable()
export class AlbumService {
    constructor(
        private http: HttpClient
    ) { }

    add(title: string, description: string) {
        return this.http.post('/api/Album/Add', { title, description });
    }

    get(id: string) {
        let params = { params: new HttpParams().set('id', id) };

        return this.http.get<Album>('/api/Album/Get', params);
    }

    getAlbumPage(id: string) {
        let params = { params: new HttpParams().set('id', id) };

        return this.http.get<AlbumPage>('/api/Album/GetAlbumPage', params);
    }

    getAll(userId: string) {
        let params = { params: new HttpParams().set('userId', userId) };

        return this.http.get<Album[]>('/api/Album/GetAll', params);
    }

    update(album: Album) {
        return this.http.post('/api/Album/Update', album);
    }
}