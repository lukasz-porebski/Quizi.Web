import { TextConfig } from '@common/models/text.config';

export interface ITableSearchConfig<TData> {
  fields: (keyof TData)[];
}

export class TableSearchConfig {
  public readonly fieldHeaders: TextConfig[];

  public constructor(fieldHeaders: TextConfig[]) {
    this.fieldHeaders = [...fieldHeaders];
  }
}
