import {MeasurementEntry} from './MeasurementEntry';

export class MeasurementsByDate {
  private _date: Date;
  private _measurements: MeasurementEntry[];

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get measurements(): MeasurementEntry[] {
    return this._measurements;
  }

  set measurements(value: MeasurementEntry[]) {
    this._measurements = value;
  }
}
