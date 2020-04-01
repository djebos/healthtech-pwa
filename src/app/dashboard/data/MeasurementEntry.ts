import {MeasurementType} from './MeasurementType';
import {MeasurementUnit} from './MeasurementUnit';

export class MeasurementEntry {
  private _type: MeasurementType;
  private _created: Date;
  private _value: string;
  private _unit: MeasurementUnit;


  constructor(type: MeasurementType, date: Date, value: string, unit: MeasurementUnit) {
    this._type = type;
    this._created = date;
    this._value = value;
    this._unit = unit;
  }

  get type(): MeasurementType {
    return this._type;
  }

  set type(value: MeasurementType) {
    this._type = value;
  }

  get created(): Date {
    return this._created;
  }

  set created(value: Date) {
    this._created = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }


  get unit(): MeasurementUnit {
    return this._unit;
  }

  set unit(value: MeasurementUnit) {
    this._unit = value;
  }
}
