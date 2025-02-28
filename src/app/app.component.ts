import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableComponent } from '../../common/components/table/table.component';
import { TableConfig } from '../../common/components/table/models/table.config';
import { TablePaginatorPageSize } from '../../common/components/table/enums/paginator-page-size.enum';

export interface IMyRow {
  text: string;
  liczba: number;
}

@Component({
  selector: 'app-root',
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly config = new TableConfig<IMyRow>({
    dataSource: Promise.resolve([
      {
        text: 'ffsfd',
        liczba: 55,
      },
      {
        text: 'vpvv',
        liczba: 7,
      },
      {
        text: 'vvv',
        liczba: 7,
      },
      {
        text: 'ffsddedfd',
        liczba: 9999999,
      },
      {
        text: 'vpvv',
        liczba: 7,
      },
      {
        text: 'vvv',
        liczba: 7,
      },
    ]),
    paginator: {
      showFirstLastButtons: true,
      defaultPageSize: TablePaginatorPageSize.Five,
    },
    filter: {
      placeholder: 'Szukaj',
    },
    headerSticky: true,
    selection: {
      initialSelection: (data) => data.find((d) => d.liczba === 9999999)!,
      onRowSelect: (row) => console.log(row),
    },
    columns: (builder) =>
      builder
        // .addText({ field: 'text', header: { text: 'ERROR' } })
        .addNumber({ field: 'liczba', header: { text: 'FIELD_IS_REQUIRED' } })
        .build(),
  });

  public constructor(private readonly _translate: TranslateService) {
    this._translate.addLangs(['pl']);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }
}
