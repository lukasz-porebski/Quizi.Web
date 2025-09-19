import { PeriodModel } from '../models/period.model';
import { PeriodRequest } from '../models/requests/period.request';

export namespace PeriodUtils {
  export function ToRequest<T>(period: PeriodModel<T>): PeriodRequest<T> {
    return {
      start: period.start,
      end: period.end,
    };
  }
}
