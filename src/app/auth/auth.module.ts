import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth-component/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [AuthComponent, RegistrationComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
