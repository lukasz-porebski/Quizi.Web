import { ITableColumnConfig } from './column.config';

export interface ITableImageColumnConfig<TData>
  extends ITableColumnConfig<TData> {
  imgPatch?: (data: TData) => string;
}
