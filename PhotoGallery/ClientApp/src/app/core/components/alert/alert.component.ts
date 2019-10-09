import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AlertService } from '@core/services/alert.service';

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
