import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/models/album';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {
  @Input() album: Album;
  @Input() isCurrentUser: boolean;
  @Output() remove = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
  }

  removeAlbum() {
    this.albumService.remove(this.album.id)
      .subscribe(albumId =>
        this.remove.emit(albumId)
      );
  }
}
