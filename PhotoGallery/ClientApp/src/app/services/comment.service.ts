import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Comment } from "../models/comment";

@Injectable()
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

    return this.http.post('/api/Comment/Add', comment);
  }
}