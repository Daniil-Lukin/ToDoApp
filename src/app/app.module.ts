import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './modules/todo/todo.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { firstValueFrom, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { TodoService } from './modules/todo/services/todo.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    TodoModule,
    SharedModule,
    AuthModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory:
        (
          authService: AuthService,
          todoService: TodoService,
          angularFireAuth: AngularFireAuth,
          router: Router
        ) =>
        () => {
          return firstValueFrom(angularFireAuth.authState).then((user) => {
            console.log(user);
            if (user) {
              authService.userLoggedIn = true;
              authService.setUser(user);
              todoService.setDocument();
              return true;
            } else {
              authService.userLoggedIn = false;
              return router.navigate(['sign-in']);
            }
          });
        },
      deps: [AuthService, TodoService, AngularFireAuth, Router],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// switchMap((user) => {
//   console.log(user);
//   if (user) {
//     authService.userLoggedIn = true;
//     authService.setUser(user);
//     return of(true);
//   } else {
//     authService.userLoggedIn = false;
//     return router.navigate(['sign-in']).then(() => true);
//   }
// }
