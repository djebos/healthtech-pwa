export class EventReminder {
  private _method: string;
  private _minutes: number;

  constructor(method: string, minutes: number) {
    this._method = method;
    this._minutes = minutes;
  }

  get method(): string {
    return this._method;
  }

  set method(value: string) {
    this._method = value;
  }

  get minutes(): number {
    return this._minutes;
  }

  set minutes(value: number) {
    this._minutes = value;
  }
}
