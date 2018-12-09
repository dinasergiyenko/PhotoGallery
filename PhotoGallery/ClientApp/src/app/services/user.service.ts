import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ){}

    get(id: string){
        let params = { params: new HttpParams().set('userId', id )};

        return this.http.get<User>('/api/User/Get', params);
    }
}