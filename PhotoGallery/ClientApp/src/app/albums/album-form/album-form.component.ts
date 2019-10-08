import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/albums/shared/album.model';
import { Location } from '@angular/common';

@Component({
  selector: 'pg-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss']
})
export class AlbumFormComponent {
  @Input() album: Album;
  @Input() loading;
  @Output() parentSubmit = new EventEmitter<Album>();

  constructor(
    private location: Location
  ) { }

  onSubmit() {
    this.loading = true;
    this.parentSubmit.emit(this.album);
  }

  cancel() {
    this.location.back();
  }
}
