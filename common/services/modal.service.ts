import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Optional } from '@common/types/optional.type';
import { isDefined } from '@common/utils/utils';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly dialog = inject(MatDialog);

  public open<TResult = unknown, TData = unknown>(
    component: ComponentType<unknown>,
    onClose?: (result: Optional<TResult>) => void,
    data?: TData,
  ) {
    try {
      const dialogRef = this.dialog.open<unknown, TData, TResult>(component, {
        data: data,
        width: '50vw',
        height: 'auto',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (isDefined(onClose)) {
          onClose(result);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
}
