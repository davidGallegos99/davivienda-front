import {
  Component,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-input-error-messages',
  standalone: true,
  imports: [MatError],
  templateUrl: './input-error-messages.component.html',
  styleUrl: './input-error-messages.component.css',
})
export class InputErrorMessagesComponent implements OnInit {
  control: InputSignal<FormControl> = input.required<FormControl>();
  errorKeys: WritableSignal<string[]> = signal<string[]>([]);
  errorMessages: WritableSignal<Record<string, string>> = signal<
    Record<string, string>
  >({});

  ngOnInit(): void {
    this.setErrorKeys();
    this.setErrorMessages();

    this.control().valueChanges.subscribe((): void => {
      this.setErrorKeys();
      this.setErrorMessages();
    });
  }

  setErrorKeys(): void {
    this.errorKeys.set(Object.keys(this.control().errors || {}));
  }

  setErrorMessages(): void {
    this.errorMessages.set({
      required: 'Este campo es requerido',
      min: 'Este campo es requerido',
      max: `El monto excede el limite de ${
        this.control().getError('max')?.max || 0
      }`,
      email: 'Ingrese un email válido',
      maxlength: `Máximo ${
        this.control().getError('maxlength')?.requiredLength || 0
      } caracteres`,
      minlength: `Mínimo ${
        this.control().getError('minlength')?.requiredLength || 0
      } caracteres`,
      onlyNumbers: 'Ingrese solo números',
      duiNumber: 'Ingrese un número de DUI válido',
    });
  }
}
