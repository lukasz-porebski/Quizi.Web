import { isDefined } from '@common/utils/utils';
import { Icon } from '@common/enums/icon.enum';
import { ITextConfig, TextConfig } from '@common/models/text.config';
import { ITableComponent } from '@common/components/table/interfaces/table-component.interface';

export interface ITableColumnActionConfig<TData> {
  icon?: Icon;
  name?: ITextConfig;
  disabled?: boolean | ((rowValue: Readonly<TData>) => boolean);
  hide?: boolean | ((rowValue: Readonly<TData>) => boolean);
  onClick?: (rowValue: Readonly<TData>, table: ITableComponent) => void;
}

export class TableColumnActionConfig<TData> {
  public icon?: Icon;
  public name?: TextConfig;
  public disabled!: (data: Readonly<TData>) => boolean;
  public hide!: boolean | ((data: Readonly<TData>) => boolean);
  public onClick!: (data: Readonly<TData>, table: ITableComponent) => void;

  public constructor(config: ITableColumnActionConfig<TData>) {
    this.icon = config.icon;
    this.name = isDefined(config.name) ? new TextConfig(config.name) : undefined;
    this._setDisabled(config);
    this._setHide(config);
    this._setOnClick(config);
  }

  private _setDisabled(config: ITableColumnActionConfig<TData>): void {
    if (!isDefined(config.disabled)) {
      this.disabled = () => false;
    } else {
      if (typeof config.disabled === 'boolean') {
        this.disabled = () => config.disabled as boolean;
      } else {
        this.disabled = config.disabled;
      }
    }
  }

  private _setHide(config: ITableColumnActionConfig<TData>): void {
    if (!isDefined(config.hide)) {
      this.hide = () => false;
    } else {
      if (typeof config.hide === 'boolean') {
        this.hide = () => config.hide as boolean;
      } else {
        this.hide = config.hide;
      }
    }
  }

  private _setOnClick(config: ITableColumnActionConfig<TData>): void {
    if (!isDefined(config.onClick)) {
      this.onClick = () => {};
    } else {
      this.onClick = config.onClick;
    }
  }
}
