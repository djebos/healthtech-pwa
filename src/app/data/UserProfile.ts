import {Role} from './Role';

export class UserProfile {
  constructor(private _email: string, private _name: string, private _pictureUrl: string, private _roles: Role[], private _authType: string) {
  }


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get pictureUrl(): string {
    return this._pictureUrl;
  }

  set pictureUrl(value: string) {
    this._pictureUrl = value;
  }

  get roles(): Role[] {
    return this._roles;
  }

  set roles(value: Role[]) {
    this._roles = value;
  }


  get authType(): string {
    return this._authType;
  }

  set authType(value: string) {
    this._authType = value;
  }
}
