import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {
  @Input() photo: Photo;
  @Input() isCurrentUser: boolean;
  @Output() remove = new EventEmitter<number>();

  constructor(
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  removePhoto() {
    this.photoService.remove(this.photo.id)
      .subscribe(photoId =>
        this.remove.emit(photoId)
      )
  }
}
