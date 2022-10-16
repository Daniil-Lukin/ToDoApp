import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthComponent } from '../auth-component/auth.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent extends AuthComponent {
  public passwordRepeat: string = '';
  public hidePasswordRepeat: boolean = true;

  constructor(service: AuthService, router: Router) {
    super(service, router);
  }

  public override registrateButtonClick(): void {
    if (this.password === this.passwordRepeat) {
      this._service.signUp(this.emailValidation.getRawValue()!, this.password);
      this._router.navigate(['signIn']);
    } else {
      window.alert('Passwords must be the same');
    }
  }
}
