import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export namespace FormUtils {
  export function Validate(control: AbstractControl): void {
    control.markAsTouched({ onlySelf: true });
    control.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach((c) => Validate(c));
    } else if (control instanceof FormArray) {
      control.controls.forEach((c) => Validate(c));
    }
  }
}
