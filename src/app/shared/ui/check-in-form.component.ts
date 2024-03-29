import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Drones } from 'src/app/shared/types/drone';
import { AddFlight } from '../types/flight';
import { Profile } from '../types/profile';
import { OptionsPopoverComponent } from './options-popover.component';

@Component({
  selector: 'app-check-in-form',
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    ReactiveFormsModule,
    OptionsPopoverComponent,
  ],
  template: `
    <form
      [formGroup]="checkInForm"
      (ngSubmit)="flight.emit(checkInForm.getRawValue())"
      (submit)="dismiss.emit()"
    >
      <ion-list lines="none">
        <ion-item>
          <ion-input
            label="Promień lotu"
            labelPlacement="stacked"
            placeholder="650"
            type="number"
            color="primary"
            formControlName="range"
            name="flight-range"
            errorText="Wprowadź prawidłowe dane"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            label="Maksymalna wysokość lotu"
            labelPlacement="stacked"
            placeholder="50"
            type="number"
            color="primary"
            formControlName="height"
            name="max-height"
            errorText="Wprowadź prawidłowe dane"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            label="Czas trwania lotu"
            labelPlacement="stacked"
            type="number"
            placeholder="40"
            formControlName="duration"
            name="duration"
            errorText="Wprowadź prawidłowe dane"
            color="primary"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-label>Dron</ion-label>
          <!-- <app-options-popover [optionsList]="userDrones" /> -->
          <ion-select
            formControlName="drone"
            aria-label="select-popover"
            interface="popover"
            placeholder="Model"
            color="primary"
          >
            @for (drone of userDrones; track drone.$id) {
            <ion-select-option [value]="drone.$id">{{
              drone.model
            }}</ion-select-option>
            }
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-note class="ion-margin ion-padding">
        Dane dotyczące współrzędnych zostaną pobrane automatycznie po
        zatwierdzeniu danych.
      </ion-note>
      <ion-button
        color="tertiary"
        type="submit"
        [disabled]="!checkInForm.valid"
      >
        Start
      </ion-button>
    </form>
  `,
  styles: `
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 12px;
        background: none;
    }


    ion-list {
      height: 100%;
      width: 100%;
      background: none!important;
    }

    ion-item {
      border-radius: 12px;
      margin:6px 6px;
  }

    ion-label {
        width: fit-content;
        text-wrap: none;
    }

    ion-button {
      width: 100%;
      max-width: 384px;
    }

 
    ion-input {
            background: none!important;

      border-radius: 12px;
      padding-bottom: 2px;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInFormComponent {
  @Input() userProfile!: Profile;
  @Input() userDrones: Drones = [];
  @Output() flight = new EventEmitter<AddFlight>();
  @Output() dismiss = new EventEmitter<void>();

  checkInForm = inject(FormBuilder).nonNullable.group({
    range: [0, Validators.required],
    height: [0, Validators.required],
    duration: [0, Validators.required],
    drone: ['', Validators.required],
  });
}
