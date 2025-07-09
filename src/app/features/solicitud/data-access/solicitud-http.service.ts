import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.development';
import { Solicitud } from '../domain/solicitud.model';
import { SolicitudRepository } from '../domain/solicitud.repository';

@Injectable({
  providedIn: 'root',
})
export class SolicitudHttpService implements SolicitudRepository {
  private readonly baseUrl = `${environment.base_url}${environment.api.solicitud}`;

  constructor(readonly http: HttpClient) {}

  getSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.baseUrl);
  }

  getSolicitudById(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.baseUrl}/${id}`);
  }

  createSolicitud(Solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.baseUrl, Solicitud);
  }

  updateSolicitud(Solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(this.baseUrl, Solicitud);
  }

  consultarInfoPerssssona(id: number): Observable<Solicitud> {
    return this.http.post<Solicitud>(
      `http://localhost:8080/consultarInfoSolicitud/${id}`,
      {}
    );
  }
}
