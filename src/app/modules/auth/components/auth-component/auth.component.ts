import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TodoService } from 'src/app/modules/todo/services/todo.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public authForm;
  public hide: boolean = true;
  public isLoading: Observable<Boolean>;

  constructor(
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

    this.isLoading = this.router.events.pipe(
      filter(
        (event) =>
          event instanceof NavigationStart || event instanceof NavigationEnd
      ),
      map((event) => event instanceof NavigationStart)
    );

    const qweqweqe = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          console.log('Nav start');
        } else {
          console.log('nav end');
        }
      });
  }

  public getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public signInButtonClick() {
    this.authService
      .signIn(this.email.value, this.password.value)
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
