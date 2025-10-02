import { Component, effect, input, OnDestroy, output } from '@angular/core';
import { map, Subscription, takeWhile, timer } from 'rxjs';
import { PeriodModel } from '@common/models/period.model';
import { TimeSpanModel } from '@common/models/time-span.model';
import { TimeSpanUtils } from '@common/utils/time-span.utils';

@Component({
  selector: 'app-count-down',
  imports: [],
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.scss',
})
export class CountDownComponent implements OnDestroy {
  public seconds = input.required<number>();
  public onFinish = output<PeriodModel<Date>>();

  public get formatedHours(): string {
    return TimeSpanUtils.FormatPartOfTimeSpan(this._remainingTime.hours);
  }

  public get formatedMinutes(): string {
    return TimeSpanUtils.FormatPartOfTimeSpan(this._remainingTime.minutes);
  }

  public get formatedSeconds(): string {
    return TimeSpanUtils.FormatPartOfTimeSpan(this._remainingTime.seconds);
  }

  private readonly _interval = 1000;

  private _timeRemainingSub = new Subscription();
  private _start!: Date;
  private _remainingTime = TimeSpanModel.CreateEmpty();

  public constructor() {
    effect(() => {
      const observable = timer(0, this._interval).pipe(
        map((n) => (this.seconds() - n) * this._interval),
        takeWhile((n) => n >= 0),
      );

      this._timeRemainingSub.unsubscribe();
      this._timeRemainingSub = observable.subscribe((miliseconds) => {
        this._remainingTime = TimeSpanModel.CreateBySeconds(miliseconds / 1000);

        if (miliseconds === 0) {
          this.finish();
        }
      });

      this._start = new Date();
    });
  }

  public ngOnDestroy(): void {
    this._timeRemainingSub.unsubscribe();
  }

  public finish(): void {
    this.onFinish.emit(this._getRunningPeriod(new Date()));
    this._timeRemainingSub.unsubscribe();
  }

  private _getRunningPeriod(end: Date): PeriodModel<Date> {
    return new PeriodModel(this._start, end);
  }
}
