import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Input() isCurrentUser: boolean;

  displayName: string;
  mailToLink: string;

  constructor() { }

  ngOnInit() {
    this.displayName = this.user.firstName + ' ' + this.user.lastName;
    this.mailToLink = 'mailto:' + this.user.email;
  }
}
