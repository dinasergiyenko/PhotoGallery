import { Component, OnInit, Input } from '@angular/core';
import { Album } from 'src/app/models/album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {
  @Input() album: Album;
  @Input() userId: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
