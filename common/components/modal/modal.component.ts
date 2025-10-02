import { Component, inject, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ModalConfig } from '@common/components/modal/models/modal.config';
import { isDefined } from '@common/utils/utils';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Optional } from '@common/types/optional.type';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [MatIcon, MatDialogClose, MatDialogTitle, MatDialogContent, TextConfigTranslatePipe],
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  public config = input.required<ModalConfig>();

  private readonly _renderer2 = inject(Renderer2);

  public ngOnInit(): void {
    if (this.config().modalMaxWidth) {
      this.turnOnMaxModalWidth();
    }
  }

  public ngOnDestroy(): void {
    if (this.config().modalMaxWidth) {
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

  private _getBody(): Optional<HTMLBodyElement> {
    const body = document.getElementsByTagName('body');

    return isDefined(body) && isDefined(body[0]) ? body[0] : null;
  }
}
