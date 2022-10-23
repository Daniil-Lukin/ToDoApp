import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public signOutButtonClick(): void {
    this.authService.signOut().subscribe(() => {
      this.authService.userLoggedIn = false;
      this.router.navigate(['sign-in']);
    });
  }
}
