import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album.model';
import { Router } from '@angular/router';

@Component({
  selector: 'pg-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent {
  album = new Album();
  loading = false;

  constructor(
    private albumService: AlbumService,
    private router: Router
  ) { }

  onSubmit(album: Album) {
    this.albumService.add(album.title, album.description)
      .subscribe(
        userId => {
          this.router.navigate(['/user', userId]);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
