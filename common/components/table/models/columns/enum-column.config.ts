import { ITableColumnConfig } from './column.config';
import { ValueTextPairModel } from '../../../../models/value-text-pair-model';

export interface ITableEnumColumnConfig<TValue> extends ITableColumnConfig {
  enumDefinition?: ReadonlyArray<ValueTextPairModel<TValue>>;
}
