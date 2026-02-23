import type { TemplateRef } from '@angular/core';
import { Component, input } from '@angular/core';
import { MatHint } from '@angular/material/form-field';
import { NgTemplateOutlet } from '@angular/common';
import type { HintConfig } from '@common/components/hint/models/hint.config';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';

@Component({
  selector: 'app-hint',
  imports: [MatHint, NgTemplateOutlet, TextConfigTranslatePipe],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.scss',
})
export class HintComponent {
  public readonly config = input.required<HintConfig>();
  public readonly template = input<TemplateRef<unknown>>();
}
