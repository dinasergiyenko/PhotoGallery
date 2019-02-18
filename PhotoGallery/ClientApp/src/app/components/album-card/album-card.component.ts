import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  @Input() album: Album;
  @Input() isCurrentUser: boolean;
  @Output() remove = new EventEmitter<number>();

  constructor(
    private albumService: AlbumService
  ) { }

  removeAlbum() {
    if (confirm("Do you want to delete this album?")) {
      this.albumService.remove(this.album.id)
        .subscribe(albumId =>
          this.remove.emit(albumId)
        );
    }
  }
}
