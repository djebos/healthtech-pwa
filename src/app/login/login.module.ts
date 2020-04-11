import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {AuthService} from './service/auth.service';
import {
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {LoginCallbackComponent} from './login-callback/login-callback.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import { SigUpComponent } from './sig-up/sig-up.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoginComponent, LoginCallbackComponent, SigUpComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlexModule,
    MatSnackBarModule
  ],
  providers: [AuthService]
})
export class LoginModule {
}
