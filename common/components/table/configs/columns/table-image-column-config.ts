import { ITableColumnConfig } from './table-column-config';

export interface ITableImageColumnConfig<TData> extends ITableColumnConfig {
  imgPatch?: (data: TData) => string;
}
