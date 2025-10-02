import { PeriodModel } from '@common/models/period.model';
import { PeriodViewModel } from '@common/models/views/period.view-model';

export namespace PeriodUtils {
  export function ToRequest<T>(period: PeriodModel<T>): PeriodViewModel<T> {
    return {
      start: period.start,
      end: period.end,
    };
  }
}
