import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {RedirectService} from '../service/redirect.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css']
})
export class LoginCallbackComponent implements OnInit {
  loginInProgress = false;

  constructor(private redirectService: RedirectService, private authService: AuthService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.loginInProgress = true;
    if (this.route.snapshot.queryParamMap.get('token')) {
      this.authService.loginWithToken(this.route.snapshot.queryParamMap.get('token')).subscribe((authSuccessful: boolean) => {
        if (authSuccessful) {
          this.redirectService.redirectUserToHomePage(this.authService.getUserFromStorage(), this.authService.redirectUri);
          this.loginInProgress = false;
        } else {
          this.logoutAndNavigateToLogin();
        }
      });
    } else {
      this.logoutAndNavigateToLogin();
    }
  }

  private logoutAndNavigateToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']).finally(() => this.loginInProgress = false);
  }
}
