import {DateTime} from './DateTime';

export class DateTimeWrapper {

  constructor(private _dateTime: DateTime, private _timeZone: string) {
  }

  get dateTime(): DateTime {
    return this._dateTime;
  }

  set dateTime(googleDateTime: DateTime) {
    this._dateTime = googleDateTime;
  }

  get timeZone(): string {
    return this._timeZone;
  }

  set timeZone(value: string) {
    this._timeZone = value;
  }
}
