import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { AlbumService } from 'src/app/services/album.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {
  private albums: Album[];
  private user: User;
  private fileUploadButtonTouched = false;

  @Input() photo: Photo;
  @Input() loading;

  @Output() onParentSubmit = new EventEmitter<Photo>();

  constructor(
    private albumService: AlbumService,
    private authenticationService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      user => this.albumService.getByUser(user.id).subscribe(
        albums => this.albums = albums
      )
    );
  }

  onFileUpload(event){
    this.photo.file = event.target.files[0];

  }

  onChoosePhotoDialog(){
    this.fileUploadButtonTouched = true;
  }

  onSubmit(){
    this.loading = true;
    this.onParentSubmit.emit(this.photo);
  }

  cancel() {
    this.location.back();
  }
}
