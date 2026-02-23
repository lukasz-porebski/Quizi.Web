import type { TimeSpan } from '@common/types/time-span.type';

export class TimeSpanModel {
  constructor(
    public readonly hours: number,
    public readonly minutes: number,
    public readonly seconds: number,
  ) {}

  public static CreateEmpty(): TimeSpanModel {
    return new TimeSpanModel(0, 0, 0);
  }

  public static CreateByTimeSpan(value: TimeSpan): TimeSpanModel {
    const splitted = value.split(':');
    return new TimeSpanModel(Number(splitted[0]), Number(splitted[1]), Number(splitted[2]));
  }

  public static CreateBySeconds(value: number): TimeSpanModel {
    if (value < 0) {
      throw new RangeError("value can't be less than 0");
    }

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    return new TimeSpanModel(hours, minutes, seconds);
  }

  public getTotalSeconds(): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds;
  }
}
