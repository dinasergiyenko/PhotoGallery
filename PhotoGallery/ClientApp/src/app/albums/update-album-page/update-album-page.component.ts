import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlbumService } from '@core/services/album.service';
import { Album } from '@app/albums/shared/album.model';

@Component({
  selector: 'pg-update-album-page',
  templateUrl: './update-album-page.component.html',
  styleUrls: ['./update-album-page.component.scss']
})
export class UpdateAlbumPageComponent implements OnInit {
  loading = false;
  album: Album;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');

        this.albumService.get(id)
          .subscribe(album => {
            this.album = album;
          });
      });
  }

  onSubmit(album: Album) {
    this.albumService.update(album)
      .subscribe(
        albumId => {
          this.router.navigate(['/album', albumId]);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
