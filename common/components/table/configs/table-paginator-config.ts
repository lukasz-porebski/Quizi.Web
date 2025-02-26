import { AppTablePaginatorPageSize } from '../enums/table-paginator-page-size.enum';

export interface ITablePaginatorConfig {
  defaultPageSize?: AppTablePaginatorPageSize;
  showFirstLastButtons?: boolean;
}

export class TablePaginatorConfig {
  public defaultPageSize: AppTablePaginatorPageSize;
  public showFirstLastButtons: boolean;

  public constructor(config: ITablePaginatorConfig) {
    this.defaultPageSize = config.defaultPageSize ?? AppTablePaginatorPageSize.Ten;
    this.showFirstLastButtons = config.showFirstLastButtons ?? true;
  }

  public getPageSizes(): number[] {
    return [
      AppTablePaginatorPageSize.Five,
      AppTablePaginatorPageSize.Ten,
      AppTablePaginatorPageSize.TwentyFive,
      AppTablePaginatorPageSize.Fifty,
      AppTablePaginatorPageSize.Hundred,
    ];
  }
}
