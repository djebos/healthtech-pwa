import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserProfile} from '../../data/UserProfile';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  private homePages: Map<string, string> = new Map<string, string>([
      ['USER', '/dashboard']
    ]
  );

  constructor(private authService: AuthService, private router: Router) {
  }

  public redirectUserToHomePage(user: UserProfile, desiredRoute?: string) {
    if (desiredRoute && this.validatePathForUser(desiredRoute, user)) {
      this.router.navigate([desiredRoute]);
    }
    this.findHomePageForUser(user);
  }

  private findHomePageForUser(user: UserProfile) {
    const homePage: string = this.homePages.get(user.roles[0].name);
    if (homePage) {
      this.router.navigate([homePage]);
    } else {
      console.log('Error determine user home page for user = ' + user.email);
      this.router.navigate(['/error']);
    }
  }

  private validatePathForUser(path: string, user: UserProfile): boolean {
    let result = false;
    const allowedPaths: string[] = [];
    this.homePages.forEach(((value, key) => {
      if (user.roles.find(role => role.name === key)) {
        allowedPaths.push(value);
      }
    }));
    allowedPaths.forEach(value => {
      if (path.startsWith(value)) {
        result = true;
      }
    });
    return result;
  }
}
