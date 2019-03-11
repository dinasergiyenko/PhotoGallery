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
    const params = { params: new HttpParams().set('userId', id) };

    return this.http.get<User>('/api/User/Get', params);
  }

  getPage(id: string, albumsPageNumber: number = 0, albumsPageSize: number = 0) {
    const params = {
      params: new HttpParams()
        .set('userId', id)
        .set('albumsPageNumber', albumsPageNumber.toString())
        .set('albumsPageSize', albumsPageSize.toString())
    };

    return this.http.get<UserPage>('/api/User/GetPage', params);
  }
}
