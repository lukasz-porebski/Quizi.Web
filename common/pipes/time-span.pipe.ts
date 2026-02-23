import type { PipeTransform } from '@angular/core';
import { inject, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeSpan',
})
export class TimeSpanPipe implements PipeTransform {
  private readonly _datePipe = inject(DatePipe);

  public transform(seconds: number): string | null {
    const time = new Date(0, 0, 0);
    time.setSeconds(seconds);

    return this._datePipe.transform(time, 'HH:mm:ss');
  }
}
