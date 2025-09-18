export class PeriodRequest<T> {
  public constructor(
    public readonly start: T,
    public readonly end: T,
  ) {}
}
