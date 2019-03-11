import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {
  @Input() photo: Photo;
  @Input() isCurrentUser: boolean;
  @Output() remove = new EventEmitter<number>();

  constructor(
    private photoService: PhotoService
  ) { }

  removePhoto() {
    if (confirm('Do you want to delete this photo?')) {
      this.photoService.remove(this.photo.id)
        .subscribe(photoId =>
          this.remove.emit(photoId)
        );
    }
  }
}
