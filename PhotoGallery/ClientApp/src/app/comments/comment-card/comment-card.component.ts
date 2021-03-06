import { Component, Input } from '@angular/core';

import { Comment } from '@app/comments/shared/comment.model';

@Component({
  selector: 'pg-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
  @Input() comment: Comment;

  constructor() { }
}
