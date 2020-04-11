import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {MatIconRegistry, MatSnackBar} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-sig-up',
  templateUrl: './sig-up.component.html',
  styleUrls: ['./sig-up.component.css']
})
export class SigUpComponent implements OnInit {
  private singUpInProgress = false;
  private durationInSeconds = 4;
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    name: new FormControl('', Validators.minLength(3)),
    password: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*\.,?%\)\(\+\=~`])(?=.*[0-9])(?=.*[a-z]).{8,16}$')]),
    repeatPassword: new FormControl('', {validators: [Validators.required, control => this.passwordsMatch(control)]})
  });


  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/google-icon1.svg'));
  }

  ngOnInit() {
  }

  registerWithCredentials() {
    this.singUpInProgress = true;
    this.authService.signUpWithCredentials(this.signUpForm.get('email').value, this.signUpForm.get('password').value).subscribe(() => {
      this.snackBar.open('Sign up resp! Now you can login', 'close', {
        duration: this.durationInSeconds * 1000,
      });
      this.signUpForm.reset();
      this.singUpInProgress = false;
      this.router.navigate(['/login']);
    }, error => {
      this.snackBar.open('Error during sign up: ' + error.err, '', {
        duration: this.durationInSeconds * 1000, panelClass: 'snackbar-error'
      });
      this.singUpInProgress = false;
    });
  }

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    if (control.parent && control.parent.get('password').value !== control.value) {
      console.log('Password dont match');
      return {passwordNotMatch: {value: true}};
    }
    return null;
  }

  signUpWithOAuth2(providerId: string) {
    this.authService.signInWithOAuth(providerId);
  }
}
