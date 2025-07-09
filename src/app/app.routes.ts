import { Routes } from '@angular/router';
import { ClientePageComponent } from '@features/cliente/ui/cliente-page/cliente-page.component';
import { HomePageComponent } from '@features/home/ui/home-page/home-page.component';
import { SolicitudPageComponent } from '@features/solicitud/ui/solicitud-page/solicitud-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomePageComponent },
  { path: 'clientes', component: ClientePageComponent },
  { path: 'solicitudes', component: SolicitudPageComponent },
];
