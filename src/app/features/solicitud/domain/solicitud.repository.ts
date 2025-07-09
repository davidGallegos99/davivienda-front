import { Observable } from 'rxjs';
import { Solicitud } from './solicitud.model';

export interface SolicitudRepository {
  getSolicitudes(): Observable<Solicitud[]>;
  getSolicitudById(id: number): Observable<Solicitud>;
  createSolicitud(solicitud: Solicitud): Observable<Solicitud>;
  updateSolicitud(solicitud: Solicitud): Observable<Solicitud>;
}
