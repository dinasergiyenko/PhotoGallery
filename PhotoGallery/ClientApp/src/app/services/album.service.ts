import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlbumService {
    constructor(
        private http: HttpClient
    ){}

    addAlbum(title: string, description: string){
        return this.http.post('/api/Album/Add', { title, description });
    }
}