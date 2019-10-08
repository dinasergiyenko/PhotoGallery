import { Component } from '@angular/core';
import { AlbumService } from '@core/services/album.service';
import { Album } from 'src/app/albums/shared/album.model';
import { Router } from '@angular/router';

@Component({
  selector: 'pg-add-album-page',
  templateUrl: './add-album-page.component.html',
  styleUrls: ['./add-album-page.component.scss']
})
export class AddAlbumPageComponent {
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
