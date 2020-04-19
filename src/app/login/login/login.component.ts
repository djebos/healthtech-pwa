import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatSnackBar} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {flatMap} from 'rxjs/operators';
import {RedirectService} from '../service/redirect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 3;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  loginInProgress = false;

  constructor(private snackBar: MatSnackBar, public router: Router, private redirectService: RedirectService, public authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/google-icon1.svg'));
  }

  public isLoggedIn(): boolean {
    return this.authService.isUserSignedIn();
  }

  ngOnInit() {
  }

  regularLogin() {
    this.loginInProgress = true;
    this.authService.signInWithCredentials(this.loginForm.value.email, this.loginForm.value.password).subscribe((result) => {
        if (result) {
          this.loginInProgress = false;
          this.redirectService.redirectUserToHomePage(this.authService.getUserFromStorage(), this.authService.redirectUri);
        } else {
          this.loginInProgress = false;
          this.snackBar.open('Failed to login. Problem on our end', '', {
            duration: this.durationInSeconds * 1000, panelClass: 'snackbar-error'
          });
        }
      }, () => {
        this.loginInProgress = false;
        this.snackBar.open('Failed to login. Invalid login or password', '', {
          duration: this.durationInSeconds * 1000, panelClass: 'snackbar-error'
        });
        this.loginForm.get('password').reset('');
      }
    );
  }

}
