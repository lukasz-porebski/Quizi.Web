import { isDefined } from '../utils/utils';

export class ErrorModel {
  public get isAny(): boolean {
    return isDefined(this.message);
  }

  public get message(): string {
    return this._message;
  }

  public get params(): any {
    return this._params;
  }

  private _message = '';
  private _params: any;

  public setMessage(message: string, params?: any): this {
    this._message = message;
    this._params = params;
    return this;
  }
}
