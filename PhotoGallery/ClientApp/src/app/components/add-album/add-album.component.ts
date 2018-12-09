import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {
  private addAlbumForm: FormGroup;
  private loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.addAlbumForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null]
    })
  }

  get formControls() {
    return this.addAlbumForm.controls;
  }

  onSubmit() {
    if (this.addAlbumForm.invalid) {
      return;
    }

    this.loading = true;

    this.albumService.addAlbum(this.formControls.title.value, this.formControls.description.value)
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
