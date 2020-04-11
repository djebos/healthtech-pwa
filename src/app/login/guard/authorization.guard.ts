import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {Role} from '../../data/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const userRoles: Role[] = this.authService.getUserFromStorage().roles;
    console.log('actual roles = ' + userRoles);
    console.log('actual roles size = ' + userRoles.length);
    const expectedRoles: string[] = next.data.roles;
    console.log('expected roles = ' + expectedRoles);
    console.log('expected roles size = ' + expectedRoles.length);
    if (expectedRoles.length > 0) {
      return of(expectedRoles.some((expectedRole) => {
        console.log('matching ' + expectedRole);
        const result: boolean = userRoles.find(userRole => userRole.name === expectedRole) != null;
        console.log('result ' + result);
        return result;
      }));
    } else {
      return of(true);
    }
  }
}
