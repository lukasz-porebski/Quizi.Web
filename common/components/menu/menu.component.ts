import { Component, effect, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ITextConfig, TextConfig } from '@common/models/text.config';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';

@Component({
  selector: 'app-menu',
  imports: [MatButton, MatMenu, MatMenuTrigger, TextConfigTranslatePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public text = input.required<ITextConfig>();

  public innerText!: TextConfig;

  public constructor() {
    effect(() => {
      this.innerText = new TextConfig(this.text()!);
    });
  }
}
