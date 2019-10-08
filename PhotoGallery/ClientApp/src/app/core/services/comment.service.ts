import { Injectable } from '@angular/core';
import { User } from 'src/app/users/shared/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '@core/services/authentication.service';
import { Comment } from '../../comments/shared/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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

  add(comment: Comment) {
    comment.userId = this.currentUser.id;

    return this.http.post<Comment>('/api/Comment/Add', comment);
  }

  getByPhoto(photoId: number, pageNumber: number, pageSize: number) {
    const params = {
      params: new HttpParams()
        .set('photoId', photoId.toString())
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    };

    return this.http.get<Comment[]>('/api/Comment/GetByPhoto', params);
  }
}
