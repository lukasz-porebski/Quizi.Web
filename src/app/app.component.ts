import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableComponent } from '../../common/components/table/table.component';
import { TableConfig } from '../../common/components/table/models/table.config';

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
  public readonly config = new TableConfig<any>({
    dataSource: Promise.resolve([
      {
        text: 'ffsfd',
        liczba: 55,
      },
      {
        text: 'vpvv',
        liczba: 7,
      },
    ]),
    columns: (builder) =>
      builder
        .addText({ field: 'text', header: { text: 'ERROR' } })
        .addNumber({ field: 'liczba', header: { text: 'FIELD_IS_REQUIRED' } })
        .build(),
  });

  public constructor(private readonly _translate: TranslateService) {
    this._translate.addLangs(['pl']);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }
}
