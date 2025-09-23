export interface PeriodRawViewModel {
  readonly start: string;
  readonly end: string;
}

export class PeriodViewModel<T> {
  public constructor(
    public readonly start: T,
    public readonly end: T,
  ) {}
}
