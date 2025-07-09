import { Observable } from 'rxjs';
import { Persona } from './cliente.model';
import { Solicitud } from '@features/solicitud/domain/solicitud.model';

export interface ClienteRepository {
  getClientes(): Observable<Persona[]>;
  getClienteById(id: number): Observable<Persona>;
  createCliente(cliente: Persona): Observable<Persona>;
  updateCliente(cliente: Persona): Observable<Persona>;
  getSolicitudesByClient(id: number): Observable<Solicitud[]>;
}
