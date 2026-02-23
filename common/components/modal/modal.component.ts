import type { OnDestroy, OnInit } from '@angular/core';
import { Component, effect, inject, input, Renderer2 } from '@angular/core';
import { isDefined } from '@common/utils/utils';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import type { Optional } from '@common/types/optional.type';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [MatIcon, MatDialogClose, MatDialogTitle, MatDialogContent, TextConfigTranslatePipe],
  styleUrls: ['./modal.component.scss'],
  providers: [TranslatePipe],
})
export class ModalComponent implements OnInit, OnDestroy {
  public readonly text = input.required<ITextConfig>();
  public readonly modalMaxWidth = input<number>();
  public readonly modalContentMaxWidth = input<number>();
  public readonly disable = input<boolean>();

  private readonly _renderer2 = inject(Renderer2);

  public innerText?: TextConfig;

  constructor() {
    effect(() => {
      this.innerText = isDefined(this.text()) ? new TextConfig(this.text()) : undefined;
    });
  }

  public ngOnInit(): void {
    if (isDefined(this.modalMaxWidth())) {
      this.turnOnMaxModalWidth();
    }
  }

  public ngOnDestroy(): void {
    if (isDefined(this.modalMaxWidth())) {
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
