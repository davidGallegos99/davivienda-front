import { Component, inject, OnInit } from '@angular/core';
import { ClientHttpService } from '@features/cliente/data-access/cliente-http.service';
import { Solicitud } from '@features/solicitud/domain/solicitud.model';
import { SolicitudService } from '@features/solicitud/services/solicitud.service';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudFormComponent } from '../solicitud-form/solicitud-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudHttpService } from '@features/solicitud/data-access/solicitud-http.service';

@Component({
  selector: 'app-solicitud-list',
  standalone: true,
  imports: [GenericTableComponent, MatIcon, MatButtonModule],
  templateUrl: './solicitud-list.component.html',
  styleUrl: './solicitud-list.component.css',
})
export class SolicitudListComponent implements OnInit {
  clientHttp = inject(ClientHttpService);
  solicitudHttp = inject(SolicitudHttpService);
  service = inject(SolicitudService);
  dialog = inject(MatDialog);
  solicitudes: Solicitud[] = [];
  idPersona?: number;
  readonly _snackBar = inject(MatSnackBar);

  constructor() {
    if (history.state.idPersona) {
      this.idPersona = history.state.idPersona;
      this.getSolicitudesByClient();
    }
  }

  ngOnInit(): void {
    this.listenTrigger();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  listenTrigger() {
    this.service.next$.subscribe((data) => {
      if (this.service.operation === 'view') {
        this.getSolicitudesByClient();
      }
    });
  }
  getSolicitudesByClient() {
    this.clientHttp.getSolicitudesByClient(this.idPersona || 0).subscribe({
      next: (response) => {
        this.solicitudes = response;
      },
    });
  }

  editar(item: Solicitud) {
    this.dialog
      .open(SolicitudFormComponent, {
        width: '700px',
        data: item,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;
        this.updateClient(result);
      });
  }

  updateClient(soli: Solicitud) {
    debugger;
    this.solicitudHttp.updateSolicitud(soli).subscribe({
      next: (response) => {
        this.service.operation = 'view';
        this.service.next$.next(true);
        this.openSnackBar('Cliente modificado exitosamente!!!', 'Cerrar');
      },
      error: (error) => {
        this.openSnackBar('Error al modificar el cliente', 'Cerrar');
      },
    });
  }
}
