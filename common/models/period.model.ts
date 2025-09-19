export class PeriodModel<T> {
  public constructor(
    public readonly start: T,
    public readonly end: T,
  ) {}
}
