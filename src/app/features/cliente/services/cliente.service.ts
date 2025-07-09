import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperationType } from '@core/interfaces/operation-type';
import { InputValidators } from '@shared/validators/input.validator';
import { Subject } from 'rxjs';

interface IForm {
  idPersona: FormControl;
  dui: FormControl;
  nit: FormControl;
  nombres: FormControl;
  apellidos: FormControl;
  sexo: FormControl;
  actividadEconomica: FormControl;
  estadoCivil: FormControl;
}
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  next$ = new Subject();
  operation: OperationType = 'view';
  //FORMULARIO
  form: IForm = {
    idPersona: new FormControl(''),
    dui: new FormControl<string>('', [
      Validators.required,
      InputValidators.onlyNumbers,
    ]),
    nit: new FormControl<string>('', [
      Validators.required,
      InputValidators.onlyNumbers,
    ]),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    actividadEconomica: new FormControl('', Validators.required),
    estadoCivil: new FormControl<string>('', Validators.required),
  };

  // Definicios de columnas para tabla de clientes
  columnas = [
    { key: 'idPersona', label: 'ID' },
    { key: 'dui', label: 'DUI' },
    { key: 'nit', label: 'NIT' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'sexo', label: 'Sexo' },
    { key: 'actividadEconomica.descripcion', label: 'Actividad Economica' },
    { key: 'actions', label: 'Acciones' },
  ];

  formGroup = new FormGroup(this.form);
  constructor() {}
}
