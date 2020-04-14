import {EventReminder} from './EventReminder';

export class Reminders {
  private _useDefault: boolean;
  private _overrides: EventReminder[];

  get overrides(): EventReminder[] {
    return this._overrides;
  }

  set overrides(value: EventReminder[]) {
    this._overrides = value;
  }

  get useDefault(): boolean {
    return this._useDefault;
  }

  set useDefault(value: boolean) {
    this._useDefault = value;
  }
}
