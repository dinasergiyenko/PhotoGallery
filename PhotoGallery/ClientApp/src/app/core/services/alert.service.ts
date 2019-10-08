import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alert: Subject<string>;

  constructor() {
    this.alert = new Subject<string>();
  }
}
