import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentCardComponent } from '@app/comments/comment-card/comment-card.component';
import { CommentsSectionComponent } from '@app/comments/comments-section/comments-section.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    CommentCardComponent,
    CommentsSectionComponent
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
