import { PeriodModel } from '../models/period.model';
import { PeriodViewModel } from '../models/views/period.view-model';

export namespace PeriodUtils {
  export function ToRequest<T>(period: PeriodModel<T>): PeriodViewModel<T> {
    return {
      start: period.start,
      end: period.end,
    };
  }
}
