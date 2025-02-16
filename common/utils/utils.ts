import { Optional } from '../components/types/optional.type';

export function isDefined<T>(value: Optional<T>): value is T {
  return value !== null && value !== undefined;
}

export function toNumber(value: any): number {
  return Number(value);
}

export function isEmpty(value: string | any[]): boolean {
  return !isDefined(value) || value.length <= 0;
}

export function replaceIfNotDefined<T>(value: T, replaceValue: T): T {
  return isDefined(value) ? value : replaceValue;
}

export function emptyIfNotDefined<T>(value: T[]): T[] {
  return isDefined(value) ? value : [];
}

export function isNumeric(num: any): boolean {
  return !isNaN(num);
}

export function createRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function getPercent(value: number, hideZeros: boolean = true): string {
  const result = value.toFixed(2);
  if (!hideZeros) {
    return result + '%';
  }

  let resultWithoutZeros = result;

  if (result.endsWith('.00')) {
    resultWithoutZeros = result.substring(0, result.length - 3);
  }

  if (result.endsWith('.0')) {
    resultWithoutZeros = result.substring(0, result.length - 2);
  }

  return resultWithoutZeros + '%';
}

export function toDurationData(durationMs: number): Date {
  const date = new Date();
  date.setTime(durationMs);
  return date;
}
