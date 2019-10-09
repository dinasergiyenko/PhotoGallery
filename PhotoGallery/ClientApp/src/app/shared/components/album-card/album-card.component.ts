import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Album } from '@app/albums/shared/album.model';

@Component({
  selector: 'pg-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  @Input() album: Album;
  @Input() isCurrentUser: boolean;
  @Output() remove = new EventEmitter<number>();

  constructor() { }

  removeAlbum() {
    if (confirm('Do you want to delete this album?')) {
      this.remove.emit(this.album.id);
    }
  }
}
