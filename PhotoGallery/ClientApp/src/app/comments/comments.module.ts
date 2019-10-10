import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentCardComponent } from '@app/comments/comment-card/comment-card.component';
import { CommentsSectionComponent } from '@app/comments/comments-section/comments-section.component';
import { SharedModule } from '@app/shared/shared.module';
import { AddCommentComponent } from './add-comment/add-comment.component';

@NgModule({
  declarations: [
    CommentCardComponent,
    CommentsSectionComponent,
    AddCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [],
  exports: [
    CommentsSectionComponent
  ]
})

export class CommentsModule { }
