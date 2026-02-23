import type { TableColumnType } from '@common/components/table/enums/column-type.enum';
import { getProperty } from '@common/utils/utils';
import type { ValueTextPairModel } from '@common/models/value-text-pair-model';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';

export interface ITableColumnConfig<TData> {
  field: keyof TData;
  header: ITextConfig;
  sticky?: boolean;
  stickyEnd?: boolean;
  minWidth?: string;
}

export interface ITableColumnInternalConfig<TData, TValue> {
  enumDefinition?: ReadonlyArray<ValueTextPairModel<TValue>>;
  imgPatch?: (data: TData) => string;
}

export class TableColumnConfig<TData, TValue> {
  public get columnDef(): string {
    return this.field as string;
  }

  public field: keyof TData;
  public header: TextConfig;
  public sticky?: boolean;
  public stickyEnd?: boolean;
  public minWidth: string;
  public markRow: boolean;
  public type: TableColumnType;
  public enumDefinition: ReadonlyArray<ValueTextPairModel<TValue>>;
  public imgPatch?: (data: TData) => string;

  constructor(
    config: ITableColumnConfig<TData>,
    type: TableColumnType,
    internalConfig?: ITableColumnInternalConfig<TData, TValue>,
  ) {
    this.field = config.field;
    this.header = new TextConfig(config.header);
    this.sticky = config.sticky;
    this.stickyEnd = config.stickyEnd;
    this.minWidth = config.minWidth ?? '';
    this.markRow = false;
    this.type = type;
    this.enumDefinition = internalConfig?.enumDefinition ?? [];
    this.imgPatch = internalConfig?.imgPatch;
  }

  public getValue(dataSource: TData): TValue {
    return getProperty(dataSource, this.field) as unknown as TValue;
  }
}
