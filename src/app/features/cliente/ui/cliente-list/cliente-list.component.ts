import { Component, inject, OnInit } from '@angular/core';
import { GenericTableComponent } from '@shared/components/generic-table/generic-table.component';
import { MatIcon } from '@angular/material/icon';
import { ClientHttpService } from '@features/cliente/data-access/cliente-http.service';
import { Persona } from '@features/cliente/domain/cliente.model';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '@features/cliente/services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [GenericTableComponent, MatIcon, MatButtonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css',
})
export class ClienteListComponent implements OnInit {
  service = inject(ClienteService);
  clientHttp = inject(ClientHttpService);
  dialog = inject(MatDialog);
  router = inject(Router);
  readonly _snackBar = inject(MatSnackBar);

  personas: Persona[] = [];

  ngOnInit(): void {
    this.getData();
    this.listenTrigger();
  }

  listenTrigger() {
    this.service.next$.subscribe((data) => {
      if (this.service.operation === 'view') {
        this.getData();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }
  editar(item: Persona) {
    console.log('Editar:', item);
    const ref = this.dialog.open(ClienteFormComponent, {
      width: '700px',
      data: item,
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.updateClient(result);
    });
  }

  updateClient(client: any) {
    const persona: Persona = this.transformClient(client);

    this.clientHttp.updateCliente(persona).subscribe({
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

  transformClient(client: any) {
    return {
      ...client,
      actividadEconomica: {
        idActividadEconomica: client.actividadEconomica,
        descripcion: client.actividadEconomica.descripcion,
      },
      estadoCivil: {
        idEstadoCivil: client.estadoCivil,
        descripcion: client.estadoCivil.descripcion,
      },
    };
  }

  showRequests(item: Persona) {
    this.router.navigate(['/solicitudes'], {
      state: { idPersona: item.idPersona },
    });
  }

  getData() {
    this.clientHttp.getClientes().subscribe((data) => {
      this.personas = data;
    });
  }
}
