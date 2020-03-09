import {MeasurementType} from './MeasurementType';

export class MeasurementEntry {
  private _type: MeasurementType;
  private _date: Date;
  private _value: string;
  private _unit: string;


  constructor(type: MeasurementType, date: Date, value: string, unit: string) {
    this._type = type;
    this._date = date;
    this._value = value;
    this._unit = unit;
  }

  get type(): MeasurementType {
    return this._type;
  }

  set type(value: MeasurementType) {
    this._type = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }


  get unit(): string {
    return this._unit;
  }

  set unit(value: string) {
    this._unit = value;
  }
}
