import { Component, input } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { ErrorModel } from '../../../models/error.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-input-error',
  imports: [
    MatError,
    TranslatePipe
  ],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss'
})
export class InputErrorComponent {
  public error = input<ErrorModel>();
}
