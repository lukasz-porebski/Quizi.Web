import type { ITableColumnConfig } from '@common/components/table/models/columns/column.config';
import type { ValueTextPairModel } from '@common/models/value-text-pair-model';

export interface ITableEnumColumnConfig<TData, TValue> extends ITableColumnConfig<TData> {
  enumDefinition?: ReadonlyArray<ValueTextPairModel<TValue>>;
}
