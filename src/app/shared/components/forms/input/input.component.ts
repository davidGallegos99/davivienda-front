import { Component, input, InputSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputType } from '@core/interfaces/input-type';
import { MatInputModule } from '@angular/material/input';
import { InputErrorMessagesComponent } from '../input-error-messages/input-error-messages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatInputModule,
    InputErrorMessagesComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  name: InputSignal<string> = input.required<string>();
  inputType: InputSignal<InputType> = input.required<InputType>();
  readonly: InputSignal<boolean | undefined> = input<boolean | undefined>();
  label: InputSignal<string> = input.required<string>();
  maxlength: InputSignal<number> = input.required<number>();
  placeholder: InputSignal<string> = input.required<string>();
  control: InputSignal<FormControl> = input.required<FormControl>();
  disabled: InputSignal<boolean | undefined> = input<boolean | undefined>();

  isDisabled(): boolean {
    return this.disabled() ?? false;
  }

  isInvalid() {
    if (
      this.control().invalid &&
      (this.control().touched || this.control().dirty)
    ) {
      return 'ng-invalid ng-dirty';
    }
    return '';
  }
}
