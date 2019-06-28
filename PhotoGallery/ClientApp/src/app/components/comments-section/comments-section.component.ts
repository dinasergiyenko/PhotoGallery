import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Constants } from 'src/app/common/constants';
import { Comment } from 'src/app/models/comment.model';

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
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.commentService.getByPhoto(this.photoId, 0, Constants.COMMENTS_PAGE_SIZE)
      .subscribe(comments => {
        this.comments = comments;
        this.isLoadMoreDisplayed = comments.length === Constants.COMMENTS_PAGE_SIZE;
      });
  }

  loadMore(pageNumber: number) {
    this.commentService.getByPhoto(this.photoId, pageNumber, Constants.COMMENTS_PAGE_SIZE)
      .subscribe(comments => {
        this.comments = this.comments.concat(comments);
        this.isLoadMoreDisplayed = comments.length === Constants.COMMENTS_PAGE_SIZE;
      });
  }

  add(comment: Comment) {
    this.comments.push(comment);
  }
}
