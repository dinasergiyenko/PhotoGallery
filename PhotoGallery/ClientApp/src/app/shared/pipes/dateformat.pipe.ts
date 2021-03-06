import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';

import { AppConfigService } from '@core/services/appConfig.service';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe extends DatePipe implements PipeTransform {
  constructor(
    @Inject(LOCALE_ID) locale: string,
    private appConfigService: AppConfigService) {
    super(locale);
  }

  transform(value: any, args?: any): any {
    return super.transform(value, this.appConfigService.dateDisplayFormat);
  }
}
