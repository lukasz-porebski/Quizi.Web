import { Component, output } from '@angular/core';
import { MatMenuItem } from '@angular/material/menu';

@Component({
  selector: 'app-menu-button',
  imports: [MatMenuItem],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
})
export class MenuButtonComponent {
  public readonly clocked = output<void>();
}
