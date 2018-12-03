import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'alert',
  template: '',
  styleUrls: []
})
export class AlertComponent {
  constructor(
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {
    this.alertService.alert.subscribe(alert => {
      this.snackBar.open(alert);
    })
  }
}
