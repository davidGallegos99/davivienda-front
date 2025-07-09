import { Persona } from '@features/cliente/domain/cliente.model';

export interface Solicitud {
  idSolicitud: number;
  persona: Persona;
  fechaCreacion: any; // o Date si querés usar objetos Date
  monto: number;
  plazo: number;
  formaPago: FormaPago;
}

export interface FormaPago {
  idFormaPago: number;
  descripcion: string;
}
