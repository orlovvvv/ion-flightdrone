import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonNote,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { LoginService } from '../../shared/data-access/login.service';
import { RegisterFormComponent } from './ui/register-form.component';


@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    IonNote,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    RegisterFormComponent,
  ],
  template: `
    <ion-card class="login-card rounded" @fadeInOut>
      @if(authService.state.user() === null){
      <ion-card-header>
        <ion-card-title> 
          Rejestracja 
        </ion-card-title>
      </ion-card-header>
      <ion-card-content style="text-align: center">
       <app-register-form style="text-align: left" registerStatus="pending" />
        <ion-note  > Masz już konto? <ion-text routerLink="/auth/login" color="primary"> Zaloguj się </ion-text> </ion-note>

      </ion-card-content>
       } @else { 
        <ion-card-content>
          <ion-spinner class="login-spinner" name="circular" color="primary"></ion-spinner>
        </ion-card-content>
       }
    </ion-card>
  `,
  styles: `
ion-icon {
  width: 24px;
  height: 24px;
}

.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  max-width: 578px;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.logo-icon {
  width: 100%;
  height: 256px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

ion-input {
  max-width: 384px;
  margin-bottom: 12px;
  --border-radius: 12px;
  --border-width: 2px;
  --border-color: var(--ion-color-tertiary);
}

.login-spinner {
  margin: 0 !important;
  height: 36px;
  width: 36px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

ion-text:hover {
  cursor: pointer;
}
`,
})
export default class RegisterPage {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);

  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.state.user()) {
        this.router.navigate(['home']);
      }
    });
  }
}
