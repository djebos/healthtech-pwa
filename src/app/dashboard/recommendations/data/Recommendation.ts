export class Recommendation {
  private _severityLevel: string;
  private _description: string;
  private _protocol: string;
  private _reminder: string;

  get severityLevel(): string {
    return this._severityLevel;
  }

  set severityLevel(value: string) {
    this._severityLevel = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get protocol(): string {
    return this._protocol;
  }

  set protocol(value: string) {
    this._protocol = value;
  }

  get reminder(): string {
    return this._reminder;
  }

  set reminder(value: string) {
    this._reminder = value;
  }
}
