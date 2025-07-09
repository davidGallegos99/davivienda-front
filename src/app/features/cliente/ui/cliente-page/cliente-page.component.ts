import { Component, inject } from '@angular/core';
import { ClienteListComponent } from '../cliente-list/cliente-list.component';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { Persona } from '@features/cliente/domain/cliente.model';
import { ClientHttpService } from '@features/cliente/data-access/cliente-http.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteService } from '@features/cliente/services/cliente.service';

@Component({
  selector: 'app-cliente-page',
  standalone: true,
  imports: [
    ClienteListComponent,
    TitleComponent,
    MatButtonModule,
    MatIcon,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './cliente-page.component.html',
  styleUrl: './cliente-page.component.css',
})
export class ClientePageComponent {
  modal = inject(MatDialog);
  clientHttp = inject(ClientHttpService);
  service = inject(ClienteService);
  readonly _snackBar = inject(MatSnackBar);

  showClientForm() {
    const ref = this.modal.open(ClienteFormComponent, {
      width: '700px',
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.saveClient(result);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  saveClient(client: any) {
    const persona: Persona = this.transformClient(client);

    this.clientHttp.createCliente(persona).subscribe({
      next: (response) => {
        this.service.operation = 'view';
        this.service.next$.next(true);
        this.openSnackBar('Cliente guardado exitosamente!!!', 'Cerrar');
      },
      error: (error) => {
        this.openSnackBar('Error al guardar el cliente', 'Cerrar');
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
}
