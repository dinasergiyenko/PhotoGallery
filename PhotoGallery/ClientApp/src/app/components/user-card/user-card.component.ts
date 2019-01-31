import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user';

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
  }

  ngOnChanges(changes: SimpleChanges){
    this.updateDisplayName();
    this.updateMailToLink();
  }

  updateDisplayName(){
    if (this.user){
      this.displayName = this.user.firstName + ' ' + this.user.lastName;
    }

  }

  updateMailToLink(){
    if (this.user){
      this.mailToLink = 'mailto:' + this.user.email;
    }

  }
}
