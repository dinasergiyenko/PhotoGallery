import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo';
import { Router } from '@angular/router';

@Component({
  selector: 'add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  private photo = new Photo();
  private loading = false;

  constructor(
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(photo: Photo){
    this.photoService.add(photo)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
        }
      )
  }
}