import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonInput, IonNote, IonSpinner } from '@ionic/angular/standalone';
import { Credentials } from 'src/app/shared/types/credentials';
import { RegisterStatus } from 'src/app/shared/types/register';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, IonButton, IonInput, IonNote, IonSpinner],
  template: `
    <form
      [formGroup]="registerForm"
      (ngSubmit)="login.emit(registerForm.getRawValue())"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <ion-input

        fill="outline"
        formControlName="email"
        type="email"
        label="Email"
        labelPlacement="stacked"
        errorText="Pole jest wymagane"
        [clearInput]="true"
       
        tabindex="2"
      ></ion-input>
      <ion-input

      fill="outline"
        formControlName="name"
        type="text"
        label="Imię i nazwisko"
        labelPlacement="stacked"
        errorText="Pole jest wymagane"
        [clearInput]="true"
       
        tabindex="2"
      ></ion-input>
       <ion-input
       class="custom ion-margin-bottom"
        fill="outline"
        formControlName="phone"
        type="tel"
        label="Numer telefonu"
        labelPlacement="stacked"
        errorText="Pole jest wymagane"
        [clearInput]="true"
        style="margin: 6px 0 36px 0;"
        tabindex="2"
      ></ion-input>
       <ion-input
       fill="outline"
        formControlName="password"
        type="password"
        label="Hasło"
        labelPlacement="stacked"
        errorText="Pole jest wymagane"
        [clearInput]="true"
        tabindex="2"
      ></ion-input>
      <ion-input

      fill="outline"
        formControlName="confirmPassword"
        type="password"
        label="Powtórz hasło"
        labelPlacement="stacked"
        errorText="Pole jest wymagane"
        [clearInput]="true"
        
        tabindex="2"
      ></ion-input>
      <ion-note class="ion-margin"> Hasło powinno składać się z przynajmniej 8 znaków.</ion-note>
      <ion-button
        color="tertiary"
        type="submit"
        [disabled]="!registerForm.valid"
      >
        @if (registerStatus !== 'authenticating') { Utwórz konto } @else {
        <ion-spinner
          class="button-spinner"
          name="circular"
          color="dark"
        ></ion-spinner>
        }
      </ion-button>
    </form>
  `,
  styles: `
 form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;
      }
ion-input {
  --max-width: 90%;
  --background: #373737;
  --color: #fff;
  --placeholder-color: #ddd;
  --placeholder-opacity: 0.8;
  --border-radius: 12px;
    margin: 6px 0;
}

ion-button {
  width: 100%;
}

`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Input({ required: true }) registerStatus: RegisterStatus = 'pending';
  @Output() login = new EventEmitter<Credentials>();

  registerForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],

  });
}
