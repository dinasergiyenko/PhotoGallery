import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { UserPage } from '../models/userPage';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    get(id: string) {
        let params = { params: new HttpParams().set('userId', id) };

        return this.http.get<User>('/api/User/Get', params);
    }

    getUserPage(id: string) {
        let params = { params: new HttpParams().set('userId', id) };

        return this.http.get<UserPage>('/api/User/GetUserPage', params);
    }
}