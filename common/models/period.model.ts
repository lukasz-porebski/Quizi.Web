export class PeriodModel<T> {
  constructor(
    public readonly start: T,
    public readonly end: T,
  ) {}
}
