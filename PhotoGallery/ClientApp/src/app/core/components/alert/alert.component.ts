import { Component } from '@angular/core';
import { AlertService } from '@core/services/alert.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'pg-alert',
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
    });
  }
}
