import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { passwordRepeatValidator } from '../extentions/password-repeat.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public hidePasswordRepeat: boolean = true;
  public hidePassword: boolean = true;

  constructor(
    private service: AuthService,
    private router: Router,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          passwordRepeatValidator(this.password),
        ],
      ],
    });
  }

  public registrateButtonClick(): void {
    if (this.registrationForm.valid) {
      this.service.signUp(this.email.value, this.password.value);
      this.router.navigate(['sign-in']);
    } else {
      window.alert('Passwords must be the same');
    }
  }

  public getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get email() {
    return this.registrationForm?.get('email');
  }

  get password() {
    return this.registrationForm?.get('password');
  }

  get passwordRepeat() {
    return this.registrationForm?.get('passwordRepeat');
  }
}
