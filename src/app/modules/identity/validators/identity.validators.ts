import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isEmpty } from '@common/utils/utils';

export namespace IdentityValidators {
  export const PasswordMinLength = 10;
  export const PasswordMaxLength = 30;
  export const PasswordFormatError = 'passwordFormat';

  export function Email(): ValidatorFn[] {
    return [Validators.required, Validators.email];
  }

  export function Password(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.minLength(PasswordMinLength),
      Validators.maxLength(PasswordMaxLength),
      passwordFormat(),
    ];
  }

  function passwordFormat(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      if (isEmpty(control.value)) {
        return null;
      }

      const error = { passwordFormat: true };
      const hasLowercase = /\p{Ll}/u.test(control.value);
      if (!hasLowercase) {
        return error;
      }

      const hasUppercase = /\p{Lu}/u.test(control.value);
      if (!hasUppercase) {
        return error;
      }

      const hasDigit = /\d/.test(control.value);
      if (!hasDigit) {
        return error;
      }

      const hasSpecialCharacter = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(control.value);
      if (!hasSpecialCharacter) {
        return error;
      }

      const hasWhiteSpace = /\s/.test(control.value);
      if (hasWhiteSpace) {
        return error;
      }

      return null;
    };
  }
}
