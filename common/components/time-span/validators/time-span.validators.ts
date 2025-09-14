import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ITimeSpanFormControl } from '../../../interfaces/time-span-form-control.interface';
import { TimeSpan } from '../../../types/time-span.type';
import { isDefined } from '../../../utils/utils';

export type TimeSpanValidatorMaxValue = { hours?: number; minutes?: number; seconds?: number };

export namespace TimeSpanValidators {
  export function MaxValue(value: TimeSpanValidatorMaxValue): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control as FormGroup<ITimeSpanFormControl>;

      if ([form.value.hours, form.value.minutes, form.value.seconds].some((v) => !isDefined(v))) {
        return null;
      }

      const currentValueInSeconds = calculateToSeconds({
        hours: form.value.hours ?? undefined,
        minutes: form.value.minutes ?? undefined,
        seconds: form.value.seconds ?? undefined,
      });
      const maxValueInSeconds = calculateToSeconds(value);

      return maxValueInSeconds > currentValueInSeconds ? null : { timeSpanMaxValue: toTimeSpan(value) };
    };
  }

  function calculateToSeconds(value: TimeSpanValidatorMaxValue): number {
    return (value.hours ?? 0) * 3600 + (value.minutes ?? 0) * 60 + (value.seconds ?? 0);
  }

  function toTimeSpan(value: TimeSpanValidatorMaxValue): TimeSpan {
    const definedHours = value.hours ?? 0;
    const definedMinutes = value.minutes ?? 0;
    const definedSeconds = value.seconds ?? 0;

    const hours = definedHours <= 9 ? `0${definedHours}` : definedHours;
    const minutes = definedMinutes <= 9 ? `0${definedMinutes}` : definedMinutes;
    const seconds = definedSeconds <= 9 ? `0${definedSeconds}` : definedSeconds;

    return `${hours}:${minutes}:${seconds}`;
  }
}
