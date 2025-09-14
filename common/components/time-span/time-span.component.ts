import { Component, input } from '@angular/core';
import { NumberInputComponent } from '../inputs/number/number.component';
import { FormGroup } from '@angular/forms';
import { ITimeSpanFormControl } from '../../interfaces/time-span-form-control.interface';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-time-span',
  imports: [
    NumberInputComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    TranslatePipe,
    MatError,
    MatFormField,
  ],
  templateUrl: './time-span.component.html',
  styleUrl: './time-span.component.scss',
})
export class TimeSpanComponent {
  public formGroup = input.required<FormGroup<ITimeSpanFormControl>>();
  public minHours = input<number>(0);
  public maxHours = input<number>();
  public minMinutes = input<number>(0);
  public maxMinutes = input<number>(60);
  public minSeconds = input<number>(0);
  public maxSeconds = input<number>(60);
}
