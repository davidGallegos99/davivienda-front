import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatIcon } from '@angular/material/icon';
import { SolicitudListComponent } from '../solicitud-list/solicitud-list.component';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudService } from '@features/solicitud/services/solicitud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudHttpService } from '@features/solicitud/data-access/solicitud-http.service';
import { SolicitudFormComponent } from '../solicitud-form/solicitud-form.component';
import { Solicitud } from '@features/solicitud/domain/solicitud.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ClientHttpService } from '@features/cliente/data-access/cliente-http.service';
import { Persona } from '@features/cliente/domain/cliente.model';

@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [TitleComponent, MatIcon, SolicitudListComponent, MatButtonModule],
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.css',
})
export class SolicitudPageComponent implements OnInit {
  modal = inject(MatDialog);
  solicitudHttp = inject(SolicitudHttpService);
  service = inject(SolicitudService);
  clientHttp = inject(ClientHttpService);
  router = inject(Router);
  persona?: Persona;
  readonly _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getPersonaById();
  }

  showSolicitudForm() {
    const ref = this.modal.open(SolicitudFormComponent, {
      width: '700px',
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.saveSolicitud(result);
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  getPersonaById() {
    this.clientHttp.getClienteById(history.state.idPersona).subscribe({
      next: (response) => {
        this.persona = response;
      },
      error: (error) => {
        this.openSnackBar('Error al obtener el cliente', 'Cerrar');
      },
    });
  }

  saveSolicitud(soli: Solicitud) {
    this.solicitudHttp.createSolicitud(soli).subscribe({
      next: (response) => {
        this.service.operation = 'view';
        this.service.next$.next(true);
        this.openSnackBar('Solicitud guardado exitosamente!!!', 'Cerrar');
      },
      error: (error) => {
        this.openSnackBar('Error al guardar el Solicitud', 'Cerrar');
      },
    });
  }
}
