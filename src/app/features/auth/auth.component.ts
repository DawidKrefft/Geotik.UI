import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginRequest } from './models/login-request.model';
import { Router } from '@angular/router';
import { ResetPassword } from './models/reset-password.model';
import { Subscription } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  // Input properties
  loginInfo: LoginRequest = { email: '', password: '' };
  registrationInfo: LoginRequest = { email: '', password: '' };
  emailInfo: ResetPassword = { email: '' };
  passwordConfirmation: string = '';

  // Flags and error messages
  registrationSuccess: boolean = false;
  resetSuccess: boolean = false;
  resetPasswordMode: boolean = false;
  loginError: string = '';
  forgotPasswordError: string = '';
  registrationError: string = '';
  registrationEmailError = '';
  registrationPasswordError = '';
  registrationMismatchError = '';
  registrationGeneralError = '';

  // Subscriptions
  private subscriptions: Subscription[] = [];

  // Tab group reference
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    const resetPasswordSubscription = this.authService
      .resetPassword(this.emailInfo)
      .subscribe(
        (response) => {
          if (response.status === 202) {
            this.forgotPasswordError =
              'Password reset request sent. Please check your email.';
            this.resetSuccess = !this.resetSuccess;
          } else {
            this.forgotPasswordError =
              'Password reset request failed. Please try again.';
          }
        },
        (error) => {
          console.error('Error:', error);

          this.forgotPasswordError =
            'Wystąpił błąd podczas wysyłania prośby o zresetowanie. Proszę spróbować ponownie.';
        }
      );
    this.subscriptions.push(resetPasswordSubscription);
  }

  onLogin() {
    const loginSubscription = this.authService.login(this.loginInfo).subscribe(
      (response) => {
        if (response.status === 200) {
          this.loginError = 'Pomyślnie zalogowano!';
        } else {
          this.loginError = 'Logowanie nie powiodło się. Spróbuj jeszcze raz.';
        }
      },
      (error) => {
        this.loginError = 'Zły email lub hasło.';
      }
    );
    this.subscriptions.push(loginSubscription);
  }
  onRegister() {
    this.registrationEmailError = ''; // Reset error messages
    this.registrationPasswordError = '';
    this.registrationMismatchError = '';
    this.registrationGeneralError = '';

    if (!this.isEmailValid(this.registrationInfo.email)) {
      this.registrationEmailError = 'Nieprawidłowy format e-mail.';
      this.registrationSuccess = false;
      return;
    }
    if (!this.isPasswordValid(this.registrationInfo.password)) {
      this.registrationPasswordError =
        'Wymagana 1 cyfra, 1 mała litera, 1 duża litera i co najmniej 8 znaków';
      this.registrationSuccess = false;
      return;
    }
    if (this.registrationInfo.password !== this.passwordConfirmation) {
      this.registrationMismatchError = 'Hasła nie są identyczne.';
      this.registrationSuccess = false;
    } else {
      const registerSubscription = this.authService
        .registerUser(this.registrationInfo)
        .subscribe(
          (response) => {
            if (response.status === 201) {
              this.registrationSuccess = true;
              setTimeout(() => {
                this.tabGroup.selectedIndex = 0;
              }, 1000);
            } else {
              this.registrationGeneralError =
                'Registracja nieudana. Proszę spróbuj ponownie.';
              this.registrationSuccess = false;
            }
          },
          (error) => {
            this.registrationGeneralError =
              'Nietypowy błąd podczas rejestracji. Proszę spróbuj ponownie później.';
            this.registrationSuccess = false;
          }
        );
      this.subscriptions.push(registerSubscription);
    }
  }
  isPasswordValid(password: string): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    return passwordPattern.test(password);
  }
  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
  }
  toggleResetPasswordMode() {
    this.resetPasswordMode = !this.resetPasswordMode;
  }
  toggleResetSuccess() {
    this.resetSuccess = !this.resetSuccess;
  }
  calculatePasswordStrength(): number {
    const password = this.registrationInfo.password;
    const minLength = 8; // Minimum length requirement

    let strength = 0;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      strength += 25;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      strength += 25;
    }

    // Check for numbers
    if (/\d/.test(password)) {
      strength += 25;
    }

    // Check for minimum length
    if (password.length >= minLength) {
      strength += 25;
    }

    return strength;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
