import { inject, Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TablePaginatorIntl extends MatPaginatorIntl {
  private readonly _translateService = inject(TranslateService);

  public constructor() {
    super();
    this._translateService
      .get('NUMBER_OF_ROWS')
      .subscribe((translate) => (this.itemsPerPageLabel = translate));

    this._translateService.get('OF').subscribe(
      (translate) =>
        (this.getRangeLabel = (
          page: number,
          pageSize: number,
          length: number,
        ) => {
          const of = translate;
          if (length === 0 || pageSize === 0) {
            return `0 ${of} ${length}`;
          }
          const newLength = Math.max(length, 0);
          const startIndex = page * pageSize;
          const endIndex =
            startIndex < newLength
              ? Math.min(startIndex + pageSize, newLength)
              : startIndex + pageSize;
          return `${startIndex + 1} - ${endIndex} ${of} ${newLength}`;
        }),
    );
  }
}
