import {DateTimeWrapper} from './DateTimeWrapper';
import {Reminders} from './Reminders';

export class Event {
  private _summary: string;
  private _id: string;
  private _start: DateTimeWrapper;
  private _end: DateTimeWrapper;
  private _reminders: Reminders;
  private _recurrence: string[];
  private _status: string;
  private _colorId: string;


  get summary(): string {
    return this._summary;
  }

  set summary(value: string) {
    this._summary = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get start(): DateTimeWrapper {
    return this._start;
  }

  set start(value: DateTimeWrapper) {
    this._start = value;
  }

  get end(): DateTimeWrapper {
    return this._end;
  }

  set end(value: DateTimeWrapper) {
    this._end = value;
  }

  get reminders(): Reminders {
    return this._reminders;
  }

  set reminders(value: Reminders) {
    this._reminders = value;
  }

  get recurrence(): string[] {
    return this._recurrence;
  }

  set recurrence(value: string[]) {
    this._recurrence = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get colorId(): string {
    return this._colorId;
  }

  set colorId(value: string) {
    this._colorId = value;
  }
}
