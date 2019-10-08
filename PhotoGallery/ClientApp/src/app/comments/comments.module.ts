import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { SharedModule } from '../shared/shared.module';

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
