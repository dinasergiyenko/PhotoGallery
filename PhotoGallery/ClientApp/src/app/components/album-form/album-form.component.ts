import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Location } from '@angular/common';

@Component({
  selector: 'album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss']
})
export class AlbumFormComponent {
  @Input() album: Album;
  @Input() loading;
  @Output() onParentSubmit = new EventEmitter<Album>();

  constructor(
    private location: Location
  ) { }

  onSubmit() {
    this.loading = true;
    this.onParentSubmit.emit(this.album);
  }

  cancel() {
    this.location.back();
  }
}
