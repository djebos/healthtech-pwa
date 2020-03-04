import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserProfile} from '../../data/UserProfile';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly TOKEN_STORAGE_KEY = 'accessToken';
  private static readonly USER_STORAGE_KEY = 'user';
  private static readonly hostUrl = environment.hostUrl;
  private static readonly authCallBackUri: string = AuthService.hostUrl + '/logincallback';
  // tslint:disable-next-line:variable-name
  private static _redirectUri: string = null;

  constructor(private router: Router, private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
  }

  public signInWithOAuth(providerId: string) {
    return window.open(`${environment.apiUrl}/oauth2/authorize/${providerId}?redirect_uri=${(AuthService.authCallBackUri)}`, '_self');
  }


  public signIn(email: string, password: string): Observable<Observable<boolean>> {
    return this.http.post(environment.apiUrl + '/v1/auth/login', {email, password}).pipe(map(
      resp => {
        return this.loginWithToken(resp['accessToken']);
      })
    );
  }

  public loginWithToken(token): Observable<boolean> {
    if (token) {
      console.log('Setting token');
      localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, token);
      return this.getCurrUserInfo().pipe(map((user: UserProfile) => {
        localStorage.setItem(AuthService.USER_STORAGE_KEY, JSON.stringify(user));
        return true;
      }));
    }

    return of(false);
  }

  public getCurrUserInfo(): Observable<UserProfile> {
    return this.http.get<UserProfile>(environment.apiUrl + '/v1/user/me');
  }

  public logout() {
    console.log('Logging out user ' + this.getUser().email);
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    localStorage.removeItem(AuthService.USER_STORAGE_KEY);
  }

  public isUserSignedIn(): boolean {
    return this.getToken() != null && this.getUser() !== undefined;
  }

 public  hasRole(role: string): boolean {
    const user: UserProfile = JSON.parse(localStorage.getItem(AuthService.USER_STORAGE_KEY));
    return user.roles.includes(role);
  }

  public hasRoles(roles: string[]): boolean {
    const results: boolean[] = roles.map(value => {
        return this.hasRole(value);
      }
    );
    if (results.every(value => value === true)) {
      return true;
    } else {
      return false;
    }
  }
  public hasAnyRoles(roles: string[]): boolean {
    const results: boolean[] = roles.map(value => {
        return this.hasRole(value);
      }
    );
    return results.find(value => value === true);
  }

  getUser(): UserProfile {
    const user = localStorage.getItem(AuthService.USER_STORAGE_KEY);
    if (user) {
      return JSON.parse(user);
    } else {
      throw new Error('User is null. Make sure that you get user in authenticated context');
    }
  }

  get redirectUri(): string {
    return AuthService._redirectUri;
  }

  set redirectUri(value: string) {
    if (value.length > 0) {
      AuthService._redirectUri = value;
    }
  }
}
