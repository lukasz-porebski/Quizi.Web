import { TimeSpan } from '../types/time-span.type';

export class TimeSpanModel {
  public readonly hours: number;
  public readonly minutes: number;
  public readonly seconds: number;

  public constructor(timeSpan: TimeSpan) {
    const splitted = timeSpan.split(':');

    this.hours = Number(splitted[0]);
    this.minutes = Number(splitted[1]);
    this.seconds = Number(splitted[2]);
  }

  public toTimeSpan(): TimeSpan {
    const hours = this.hours <= 9 ? `0${this.hours}` : this.hours;
    const minutes = this.minutes <= 9 ? `0${this.minutes}` : this.minutes;
    const seconds = this.seconds <= 9 ? `0${this.seconds}` : this.seconds;

    return `${hours}:${minutes}:${seconds}`;
  }
}
