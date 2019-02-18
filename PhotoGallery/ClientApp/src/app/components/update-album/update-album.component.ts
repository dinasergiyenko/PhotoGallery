import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.scss']
})

export class UpdateAlbumComponent implements OnInit {
  private loading = false;
  private album: Album;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        let id = params.get('id');

        this.albumService.get(id)
          .subscribe(album => {
            this.album = album
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
