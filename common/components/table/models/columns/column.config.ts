import { TableColumnType } from '../../enums/column-type.enum';
import { getProperty } from '../../../../utils/utils';
import { ValueTextPairModel } from '../../../../models/value-text-pair-model';
import { ITextConfig, TextConfig } from '../../../../models/text.config';

export interface ITableColumnConfig {
  field: string;
  header: ITextConfig
  sticky?: boolean;
  stickyEnd?: boolean;
  minWidth?: string;
}

export interface ITableColumnInternalConfig<TData, TValue> {
  enumDefinition?: ReadonlyArray<ValueTextPairModel<TValue>>;
  imgPatch?: (data: TData) => string;
}

export class TableColumnConfig<TData, TValue> {
  public field: string;
  public header: TextConfig;
  public sticky?: boolean;
  public stickyEnd?: boolean;
  public minWidth: string;
  public markRow: boolean;
  public type: TableColumnType;
  public enumDefinition: ReadonlyArray<ValueTextPairModel<TValue>>;
  public imgPatch?: (data: TData) => string;

  public constructor(
    config: ITableColumnConfig,
    type: TableColumnType,
    internalConfig?: ITableColumnInternalConfig<TData, TValue>) {
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
    return getProperty(dataSource, this.field as keyof TData) as unknown as TValue;
  }
}


