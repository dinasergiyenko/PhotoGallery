import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
  @Input() comment: Comment;

  constructor() { }
}
