export interface ActividadEconomica {
  idActividadEconomica: number;
  descripcion: string;
}

export interface EstadoCivil {
  idEstadoCivil: number;
  descripcion: string;
}

export interface Persona {
  idPersona: number;
  dui: string;
  nit: string;
  nombres: string;
  apellidos: string;
  sexo: string;
  actividadEconomica: ActividadEconomica;
  estadoCivil: EstadoCivil;
}
