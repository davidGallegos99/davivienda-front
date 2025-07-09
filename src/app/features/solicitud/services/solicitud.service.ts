import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperationType } from '@core/interfaces/operation-type';
import { InputValidators } from '@shared/validators/input.validator';
import { Subject } from 'rxjs';

interface IForm {
  idSolicitud: FormControl;
  persona: FormControl;
  fechaCreacion: FormControl;
  monto: FormControl;
  plazo: FormControl;
  formaPago: FormControl;
}
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  next$ = new Subject(); // Indica que ha habido un cambio en la operación
  // Indica el tipo de operación que se está realizando (ver, crear, actualizar)
  operation: OperationType = 'view';
  //FORMULARIO
  form: IForm = {
    idSolicitud: new FormControl(''),
    persona: new FormControl('', [Validators.required]),
    fechaCreacion: new FormControl(''),
    monto: new FormControl('', [
      Validators.required,
      InputValidators.onlyNumbers,
    ]),
    plazo: new FormControl('', [
      Validators.required,
      InputValidators.onlyNumbers,
    ]),
    formaPago: new FormControl('', [Validators.required]),
  };

  formasDePago = [
    { idFormaPago: 1, descripcion: 'Efectivo' },
    { idFormaPago: 2, descripcion: 'Transferencia Bancaria' },
    { idFormaPago: 3, descripcion: 'Cheque' },
  ];

  columnas = [
    { key: 'idSolicitud', label: 'ID' },
    { key: 'persona.nombres', label: 'Persona' },
    { key: 'fechaCreacion', label: 'Fecha', pipe: 'date' },
    { key: 'monto', label: 'Monto', pipe: 'currency' },
    { key: 'plazo', label: 'Plazo en meses' },
    { key: 'formaPago.descripcion', label: 'Forma de Pago' },
    { key: 'actions', label: 'Acciones' },
  ];

  formGroup = new FormGroup(this.form);
  constructor() {}
}
