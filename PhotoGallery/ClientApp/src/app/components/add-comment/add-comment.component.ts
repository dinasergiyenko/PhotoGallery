import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() photoId: number;
  addCommentForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.addCommentForm = this.formBuilder.group({
      text: [null, Validators.required]
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.addCommentForm.invalid){
      return;
    }

    this.loading = true;

    let comment = new Comment();
    comment.text = this.addCommentForm.controls.text.value;
    comment.photoId = this.photoId;

    this.commentService.add(comment)
      .subscribe(
        data => {
          formDirective.resetForm();
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }
}
