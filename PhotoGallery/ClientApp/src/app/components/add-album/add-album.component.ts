import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent {
  private loading = false;
  private album = new Album();

  constructor(
    private albumService: AlbumService,
  ) { }

  onSubmit(album: Album) {
    this.albumService.add(album.title, album.description)
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
