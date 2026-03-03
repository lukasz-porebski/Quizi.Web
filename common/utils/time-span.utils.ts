import type { TimeSpan } from '@common/types/time-span.type';
import type { TimeSpanModel } from '@common/models/time-span.model';
import type { ITimeSpanFormControl } from '@common/interfaces/time-span-form-control.interface';

export namespace TimeSpanUtils {
  export function ToDisplayValue(value: TimeSpanModel): string {
    return toTimeSpan({
      hours: value.hours,
      minutes: value.minutes,
      seconds: value.seconds,
      miliseconds: value.miliseconds,
      hidenMiliseconds: true,
    });
  }

  export function ToTimeSpanByModel(value: TimeSpanModel): TimeSpan {
    return toTimeSpan({
      hours: value.hours,
      minutes: value.minutes,
      seconds: value.seconds,
      miliseconds: value.miliseconds,
    });
  }

  export function ToTimeSpanByForm(value: ITimeSpanFormControl): TimeSpan {
    return toTimeSpan({
      hours: value.hours.value!,
      minutes: value.minutes.value!,
      seconds: value.seconds.value!,
      miliseconds: 0,
    });
  }

  export function FormatPartOfTimeSpan(value: number): string {
    return value <= 9 ? `0${value}` : String(value);
  }

  function toTimeSpan(value: {
    hours: number;
    minutes: number;
    seconds: number;
    miliseconds: number;
    hidenMiliseconds?: boolean;
  }): TimeSpan {
    const result = `${FormatPartOfTimeSpan(value.hours)}:${FormatPartOfTimeSpan(value.minutes)}:${FormatPartOfTimeSpan(value.seconds)}`;
    const miliseconds = value.hidenMiliseconds === true ? '' : `.${FormatPartOfTimeSpan(value.miliseconds)}`;

    return result + miliseconds;
  }
}
