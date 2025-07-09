import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientHttpService } from '@features/cliente/data-access/cliente-http.service';
import { Solicitud } from '@features/solicitud/domain/solicitud.model';
import { SolicitudService } from '@features/solicitud/services/solicitud.service';
import { InputComponent } from '@shared/components/forms/input/input.component';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    InputComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './solicitud-form.component.html',
  styleUrl: './solicitud-form.component.css',
})
export class SolicitudFormComponent implements OnDestroy, OnInit {
  dialogRef = inject(MatDialogRef<SolicitudFormComponent>);
  solicitudService = inject(SolicitudService);
  clientService = inject(ClientHttpService);
  idPersona?: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Solicitud) {
    if (history.state.idPersona) {
      this.idPersona = history.state.idPersona;
      this.solicitudService.form.persona.setValue(this.idPersona);
    }
  }

  ngOnInit(): void {
    this.init();
    this.solicitudService.formGroup.markAsPristine();
  }

  ngOnDestroy(): void {
    this.solicitudService.formGroup.reset();
    this.solicitudService.formGroup.markAsPristine();
  }

  onSubmit() {
    if (this.solicitudService.formGroup.invalid) {
      this.solicitudService.formGroup.markAllAsTouched();
      return;
    }

    const data: any = {
      fechaCreacion: this.data?.fechaCreacion ?? new Date(),
      idSolicitud: this.data ? this.data.idSolicitud : 0,
      persona: {
        idPersona: this.solicitudService.form.persona.value,
      },
      formaPago: {
        idFormaPago: this.solicitudService.form.formaPago.value,
      },
      monto: this.solicitudService.form.monto.value,
      plazo: this.solicitudService.form.plazo.value,
    };

    this.dialogRef.close(data);
  }

  init() {
    if (this.data) {
      this.solicitudService.operation = 'update';
    } else {
      this.solicitudService.operation = 'create';
    }

    this.initForm();
  }

  initForm() {
    if (this.data) {
      this.solicitudService.formGroup.patchValue({
        idSolicitud: this.data.idSolicitud,
        persona: this.data.persona.idPersona,
        fechaCreacion: this.data.fechaCreacion,
        monto: this.data.monto,
        plazo: this.data.plazo,
        formaPago: this.data.formaPago.idFormaPago,
      });
    }
  }
}
