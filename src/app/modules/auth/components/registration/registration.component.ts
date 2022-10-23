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
    this.registrationForm = this.builder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(6)]],
      }
      // {
      //   validators: this.passwordRepeatValidator(
      //     this.password.value,
      //     this.passwordRepeat.value
      //   ),
      // }
    );
  }

  public registrateButtonClick(): void {
    // if (this.password.value === this.passwordRepeat.value) {
    this.service.signUp(this.email.value, this.password.value);
    this.router.navigate(['sign-in']);
    // } else {
    //   window.alert('Passwords must be the same');
    // }
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

  private passwordRepeatValidator(password: string, passwordRepeat: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (password != passwordRepeat) {
        return { passwordsDoNotMatch: true };
      }
      return null;
    };
  }
}
