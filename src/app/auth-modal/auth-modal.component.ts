import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';

interface IAlert {
  type: ALERT_TYPES;
  message: string;
}

enum ALERT_TYPES {
  success = 'alert-success',
  danger = 'alert-danger',
  info = 'alert-info'
}

@Component({
  selector: ' app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.less']
})
export class AuthModalComponent implements OnInit {
  @ViewChild('alertRef', { static: false }) alertRef: ElementRef;

  public validatingForm: FormGroup;
  public isRegistrationMode: boolean = false;
  public alert: IAlert = null;
  public isLoading = false;

  constructor(public authService: AuthService, public modalRef: MDBModalRef) {}

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      loginFormModalPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ]),
      loginFormModalRepeatPassword: new FormControl('')
    });
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  get loginFormModalRepeatPassword() {
    return this.validatingForm.get('loginFormModalRepeatPassword');
  }

  public closeAlert() {
    this.alert = null;
    this.resetState();
  }

  public onToggleMode() {
    this.isRegistrationMode = !this.isRegistrationMode;
    if (this.isRegistrationMode) {
      this.loginFormModalRepeatPassword.setValidators([
        Validators.minLength(6),
        Validators.required
      ]);
    } else {
      this.loginFormModalRepeatPassword.setValidators(null);
    }
    this.resetState();
    this.validatingForm.reset();
  }

  public onSignIn() {
    this.isLoading = true;
    this.resetState();
    this.authService
      .signIn(this.loginFormModalEmail.value, this.loginFormModalPassword.value)
      .then((result) => {
        if (result.user.emailVerified) {
          this.modalRef.hide();
        } else {
          this.showAlert(ALERT_TYPES.info, 'Адрес электронной почты не подтвержден.');
          this.loginFormModalPassword.reset();
        }
      })
      .catch(() => {
        this.loginFormModalPassword.reset();
        this.showAlert(
          ALERT_TYPES.danger,
          'Неверный пароль или адрес электронной почты.'
        );
      })
      .finally(() => {
        this.validatingForm.clearValidators();
        this.isLoading = false;
      });
  }

  public onRegistration() {
    this.isLoading = true;
    this.resetState();
    if (
      this.loginFormModalPassword.value !==
      this.loginFormModalRepeatPassword.value
    ) {
      this.showAlert(ALERT_TYPES.danger, 'Ошибка. Пароли не совпадают.');
      this.loginFormModalRepeatPassword.reset();
      this.loginFormModalPassword.reset();
      this.isLoading = false;
    } else {
      this.authService
        .signUp(
          this.loginFormModalEmail.value,
          this.loginFormModalPassword.value
        )
        .then((uc) => {
          this.onToggleMode();
          this.loginFormModalEmail.setValue(uc.user.email);
          this.showAlert(
            ALERT_TYPES.success,
            'Отправлено подтверждение, проверьте почту.'
          );
        })
        .catch(() => {
          this.showAlert(ALERT_TYPES.danger, 'Ошибка. Пользователь уже зарегистрирован.');
          this.loginFormModalRepeatPassword.reset();
          this.loginFormModalPassword.reset();
        })
        .finally(() => {
          this.validatingForm.clearValidators();
          this.isLoading = false;
        });
    }
  }

  private showAlert(type: ALERT_TYPES, message: string) {
    this.alert = {
      message,
      type
    };
  }

  private resetState() {
    this.validatingForm.clearValidators();
    this.alert = null;
  }
}
