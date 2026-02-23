import { TablePaginatorPageSize } from '@common/components/table/enums/paginator-page-size.enum';

export interface ITablePaginatorConfig {
  defaultPageSize?: TablePaginatorPageSize;
  showFirstLastButtons?: boolean;
}

export class TablePaginatorConfig {
  public defaultPageSize: TablePaginatorPageSize;
  public showFirstLastButtons: boolean;

  constructor(config: ITablePaginatorConfig) {
    this.defaultPageSize = config.defaultPageSize ?? TablePaginatorPageSize.Ten;
    this.showFirstLastButtons = config.showFirstLastButtons ?? true;
  }

  public getPageSizes(): number[] {
    return [
      TablePaginatorPageSize.Five,
      TablePaginatorPageSize.Ten,
      TablePaginatorPageSize.TwentyFive,
      TablePaginatorPageSize.Fifty,
      TablePaginatorPageSize.Hundred,
    ];
  }
}
