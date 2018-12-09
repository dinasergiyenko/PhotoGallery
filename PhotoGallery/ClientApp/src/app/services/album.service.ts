import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {
    constructor(
        private http: HttpClient
    ){}

    add(title: string, description: string){
        return this.http.post('/api/Album/Add', { title, description });
    }

    get(id: string){
        let params = { params: new HttpParams().set('id', id )};

        return this.http.get<Album>('/api/Album/Get', params);
    }

    update(album: Album){
        return this.http.post('/api/Album/Update', album);
    }
}