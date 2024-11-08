import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TodoService } from 'src/app/modules/todo/services/todo.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public authForm;
  public hide: boolean = true;
  public isLoading: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private todoService: TodoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public signInButtonClick() {
    this.isLoading = true;
    this.authService
      .signIn(this.email.value, this.password.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(() => {
        this.todoService.setDocument();
        this.router.navigate(['to-do']);
      });
  }

  public registrateButtonClick() {
    this.router.navigate(['registration']);
  }

  public forgotPasswordButtonClick() {
    this.authService
      .resetPassword(this.email.value)
      .subscribe(() => console.log('message has been send to your accaunt'));
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }
}
