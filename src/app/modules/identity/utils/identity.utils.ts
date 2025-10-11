import { FormControl } from '@angular/forms';
import { ITextConfig } from '@common/models/text.config';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';

export namespace IdentityUtils {
  export function TryGetPasswordFormatError(control: FormControl<string>): ITextConfig | undefined {
    return control.hasError(IdentityValidators.PasswordFormatError)
      ? {
          text: 'INVALID_FORMAT',
        }
      : undefined;
  }
}
