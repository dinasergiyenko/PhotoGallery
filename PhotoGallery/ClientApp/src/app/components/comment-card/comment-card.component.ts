import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
  @Input() comment: Comment;

  constructor() { }
}
