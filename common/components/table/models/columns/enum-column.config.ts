import { ITableColumnConfig } from './column.config';
import { ValueTextPairModel } from '../../../../models/value-text-pair-model';

export interface ITableEnumColumnConfig<TData, TValue>
  extends ITableColumnConfig<TData> {
  enumDefinition?: ReadonlyArray<ValueTextPairModel<TValue>>;
}
