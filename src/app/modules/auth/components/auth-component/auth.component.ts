import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public emailValidation = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public hide: boolean = true;
  public password: string = '';

  constructor(protected _service: AuthService, protected _router: Router) {}

  public getErrorMessage(): string {
    if (this.emailValidation.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailValidation.hasError('email') ? 'Not a valid email' : '';
  }

  public signInButtonClicked() {
    this._service.signIn(this.emailValidation.getRawValue()!, this.password);
  }

  public registrateButtonClick() {
    this._router.navigate(['registration']);
  }

  public forgotPasswordButtonClick() {
    this._service.resetPassword(this.emailValidation.getRawValue()!);
  }
}
