import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss']
})
export class UpdatePhotoComponent implements OnInit {
  private loading = false;
  private photo: Photo;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let id = params.get('id');
        this.photoService.get(id).subscribe(
          photo => {
            this.photo = photo
          }
        )
      }
    )
  }

  onSubmit(photo: Photo){
    this.photoService.update(photo)
      .subscribe(
        data => {
          this.router.navigate(['/']);
          //this.router.navigate(['/photo', this.photo.id])
        },
        error => {
          this.loading = false;
        }
      )
  }
}