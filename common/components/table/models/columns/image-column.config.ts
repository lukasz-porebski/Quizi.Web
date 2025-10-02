import { ITableColumnConfig } from '@common/components/table/models/columns/column.config';

export interface ITableImageColumnConfig<TData> extends ITableColumnConfig<TData> {
  imgPatch?: (data: TData) => string;
}
