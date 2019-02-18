import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

Injectable()
export class AlertService {
  public alert: Subject<string>;

  constructor() {
    this.alert = new Subject<string>();
  }
}