import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ClienteService } from '@features/cliente/services/cliente.service';
import { InputComponent } from '@shared/components/forms/input/input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Persona } from '@features/cliente/domain/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    InputComponent,
    MatDialogClose,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteFormComponent implements OnDestroy, OnInit {
  dialogRef = inject(MatDialogRef<ClienteFormComponent>);
  clientService = inject(ClienteService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Persona) {}

  ngOnInit(): void {
    this.init();
    this.clientService.formGroup.markAsPristine();
  }

  ngOnDestroy(): void {
    this.clientService.formGroup.reset();
    this.clientService.formGroup.markAsPristine();
  }
  onSubmit() {
    if (this.clientService.formGroup.invalid) {
      this.clientService.formGroup.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.clientService.formGroup.value);
  }

  init() {
    if (this.data) {
      this.clientService.operation = 'update';
    } else {
      this.clientService.operation = 'create';
    }

    this.initForm();
  }

  initForm() {
    if (this.data) {
      this.clientService.formGroup.patchValue({
        idPersona: this.data.idPersona,
        dui: this.data.dui,
        nit: this.data.nit,
        nombres: this.data.nombres,
        apellidos: this.data.apellidos,
        sexo: this.data.sexo,
        estadoCivil: this.data.estadoCivil.idEstadoCivil,
        actividadEconomica: this.data.actividadEconomica.idActividadEconomica,
      });
    }
  }
}
