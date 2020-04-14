export class DateTime {
  constructor(private _value: number, private _dateOnly: boolean, private _timeZoneShift: number) {
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get dateOnly(): boolean {
    return this._dateOnly;
  }

  set dateOnly(value: boolean) {
    this._dateOnly = value;
  }

  get timeZoneShift(): number {
    return this._timeZoneShift;
  }

  set timeZoneShift(value: number) {
    this._timeZoneShift = value;
  }
}
