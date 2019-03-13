import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/models/photo.model';
import { AlbumService } from 'src/app/services/album.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {
  @Input() photo: Photo;
  @Input() loading;
  @Output() parentSubmit = new EventEmitter<Photo>();

  albums: Album[];
  user: User;
  fileUploadButtonTouched = false;

  constructor(
    private albumService: AlbumService,
    private authenticationService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser
      .subscribe(currentUser =>
        this.albumService.getByUser(currentUser.id)
          .subscribe(albums =>
            this.albums = albums
          )
      );
  }

  onFileUpload(event) {
    this.photo.file = event.target.files[0];
  }

  onChoosePhotoDialog() {
    this.fileUploadButtonTouched = true;
  }

  onSubmit() {
    this.loading = true;
    this.parentSubmit.emit(this.photo);
  }

  cancel() {
    this.location.back();
  }
}
