import { TextConfig } from '../../../../models/text.config';

export interface IRadioOption<T> {
  label: TextConfig;
  value: T;
}
