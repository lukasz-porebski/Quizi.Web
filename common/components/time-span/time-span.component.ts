import { Component, input } from '@angular/core';
import { NumberInputComponent } from '@common/components/inputs/number/number.component';
import type { FormGroup } from '@angular/forms';
import type { ITimeSpanFormControl } from '@common/interfaces/time-span-form-control.interface';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-time-span',
  imports: [NumberInputComponent, MatCard, MatCardContent, MatCardHeader, TranslatePipe, MatError],
  templateUrl: './time-span.component.html',
  styleUrl: './time-span.component.scss',
})
export class TimeSpanComponent {
  public readonly formGroup = input.required<FormGroup<ITimeSpanFormControl>>();
  public readonly minHours = input<number>(0);
  public readonly maxHours = input<number>();
  public readonly minMinutes = input<number>(0);
  public readonly maxMinutes = input<number>(60);
  public readonly minSeconds = input<number>(0);
  public readonly maxSeconds = input<number>(60);
  public readonly readOnly = input<boolean>(false);
}
