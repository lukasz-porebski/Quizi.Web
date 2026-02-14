import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmpty } from '@common/utils/utils';
import { Guid } from '@common/types/guid.type';

export namespace TextInputValidator {
  const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  export function Guid(): ValidatorFn {
    return (control: AbstractControl<Guid>): ValidationErrors | null => {
      const value = control.value;
      if (isEmpty(value)) {
        return null;
      }

      return GUID_REGEX.test(value) ? null : { guid: true };
    };
  }
}
