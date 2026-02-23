import { ChangeDetectorRef, Component, effect, inject, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-async-page',
  templateUrl: './async-page.component.html',
  styleUrls: ['./async-page.component.scss'],
  imports: [MatProgressSpinner],
})
export class AsyncPageComponent {
  public readonly showSpinner = input.required<boolean>();

  private readonly _cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.showSpinner();
      this._cdr.detectChanges();
    });
  }
}
