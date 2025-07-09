import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../domain/cliente.model';
import { environment } from '@env/environment.development';
import { ClienteRepository } from '../domain/cliente.repository';
import { Solicitud } from '@features/solicitud/domain/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class ClientHttpService implements ClienteRepository {
  private readonly baseUrl = `${environment.base_url}${environment.api.cliente}`;

  constructor(readonly http: HttpClient) {}

  getClientes(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseUrl);
  }

  getClienteById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseUrl}/${id}`);
  }

  getSolicitudesByClient(id: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.baseUrl}/${id}/solicitudes`);
  }

  createCliente(cliente: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.baseUrl, cliente);
  }

  updateCliente(cliente: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.baseUrl, cliente);
  }
}
