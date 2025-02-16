import { Component, input } from '@angular/core';
import { isEmpty } from '../../utils/utils';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../enums/icon.enum';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  imports: [
    MatIcon,
    TranslatePipe,
  ],
  styleUrls: ['./error.component.scss']
})
export class AppErrorComponent {
  public translateMessage = input<boolean>(true);
  public messages = input.required<string[]>();

  public get isAnyMessage(): boolean {
    return !isEmpty(this.messages());
  }

  public get isOnlyOneMessage(): boolean {
    return this.messages.length === 1;
  }

  public readonly Icon = Icon;
}
