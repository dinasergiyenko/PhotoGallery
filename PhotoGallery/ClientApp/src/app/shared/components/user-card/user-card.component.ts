import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/users/shared/user.model';

@Component({
  selector: 'pg-user-card',
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
