import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let id = params.get('id');
        this.albumService.get(id).subscribe(
          album => {
            this.album = album
          })
      } 
    )
  }
  
  onSubmit(album: Album) {
    this.albumService.update(album)
      .subscribe(
        data => {
          console.log(data);
          //ToDo: add redirection to user's profile
        },
        error => {
          this.loading = false;
        }
      )
  }
}
