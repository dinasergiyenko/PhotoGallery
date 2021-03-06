import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '@core/services/authentication.service';
import { AppConfigService } from '@core/services/appConfig.service';
import { CommentService } from '@core/services/comment.service';
import { Comment } from '@app/comments/shared/comment.model';

@Component({
  selector: 'pg-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
  @Input() photoId: number;
  @Input() username: string;

  comments: Comment[];
  isLoadMoreDisplayed: boolean;

  constructor(
    private commentService: CommentService,
    private appConfigService: AppConfigService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.commentService.getByPhoto(this.photoId, 0, this.appConfigService.commentsPageSize)
      .subscribe(comments => {
        this.comments = comments;
        this.isLoadMoreDisplayed = comments.length === this.appConfigService.commentsPageSize;
      });
  }

  loadMore(pageNumber: number) {
    this.commentService.getByPhoto(this.photoId, pageNumber, this.appConfigService.commentsPageSize)
      .subscribe(comments => {
        this.comments = this.comments.concat(comments);
        this.isLoadMoreDisplayed = comments.length === this.appConfigService.commentsPageSize;
      });
  }

  add(comment: Comment) {
    this.comments.push(comment);
  }

  isLogged() {
    return this.authenticationService.isLogged();
  }
}
