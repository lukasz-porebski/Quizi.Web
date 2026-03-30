import type { FormControl } from '@angular/forms';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';
import type { ITextConfig } from '@lukasz-porebski/lp-common';

export namespace IdentityUtils {
  export function TryGetPasswordFormatError(control: FormControl<string>): ITextConfig | undefined {
    return control.hasError(IdentityValidators.PasswordFormatError)
      ? {
          text: 'INVALID_FORMAT',
        }
      : undefined;
  }
}
