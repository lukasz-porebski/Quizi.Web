import { Component, input, TemplateRef } from '@angular/core';
import { MatHint } from '@angular/material/form-field';
import { NgTemplateOutlet } from '@angular/common';
import { HintConfig } from './models/hint.config';
import { TextConfigTranslatePipe } from '../../pipes/text-config-translation.pipe';

@Component({
  selector: 'app-hint',
  imports: [MatHint, NgTemplateOutlet, TextConfigTranslatePipe],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.scss',
})
export class HintComponent {
  public config = input.required<HintConfig>();
  public template = input<TemplateRef<unknown>>();
}
