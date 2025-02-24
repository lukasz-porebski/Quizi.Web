import { Component, inject, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ModalModel } from './models/modal.model';
import { isDefined } from '../../utils/utils';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ConditionalTranslatePipe } from '../../pipes/conditional-translation.pipe';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [
    MatIcon,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ConditionalTranslatePipe
  ],
  styleUrls: [ './modal.component.scss' ]
})
export class AppModalComponent implements OnInit, OnDestroy {
  public configuration = input.required<ModalModel>();

  private readonly _renderer2 = inject(Renderer2)

  public ngOnInit(): void {
    if (this.configuration().modalMaxWidth) {
      this.turnOnMaxModalWidth();
    }
  }

  public ngOnDestroy(): void {
    if (this.configuration().modalMaxWidth) {
      this.turnOffMaxModalWidth();
    }
  }

  public turnOnMaxModalWidth(): void {
    const body = this._getBody();
    if (isDefined(body)) {
      this._renderer2.addClass(body, 'max-modal-width');
    }
  }

  public turnOffMaxModalWidth(): void {
    const body = this._getBody();
    if (isDefined(body)) {
      this._renderer2.removeClass(body, 'max-modal-width');
    }
  }

  private _getBody(): HTMLBodyElement | null {
    const body = document.getElementsByTagName('body');

    return isDefined(body) && isDefined(body[0])
      ? body[0]
      : null;
  }
}
