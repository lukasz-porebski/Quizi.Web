import { TextConfig } from '@common/models/text.config';

export interface IRadioOption<T> {
  label: TextConfig;
  value: T;
}
