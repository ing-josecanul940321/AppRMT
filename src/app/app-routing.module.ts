import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'buscador',
    loadChildren: () => import('./buscador/buscador.module').then( m => m.BuscadorPageModule)
  },
  {
    path: 'hotelesdestino',
    loadChildren: () => import('./hotelesdestino/hotelesdestino.module').then( m => m.HotelesdestinoPageModule)
  },
  {
    path: 'habitacion/:id',
    loadChildren: () => import('./habitacion/habitacion.module').then( m => m.HabitacionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reservaciones',
    loadChildren: () => import('./reservaciones/reservaciones.module').then( m => m.ReservacionesPageModule)
  },
  {
    path: 'detallereservacion/:id',
    loadChildren: () => import('./detallereservacion/detallereservacion.module').then( m => m.DetallereservacionPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'agencia',
    loadChildren: () => import('./agencia/agencia.module').then( m => m.AgenciaPageModule)
  },
  {
    path: 'bloqueos',
    loadChildren: () => import('./bloqueos/bloqueos.module').then( m => m.BloqueosPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'tarifas',
    loadChildren: () => import('./tarifas/tarifas.module').then( m => m.TarifasPageModule)
  },
  {
    path: 'detalletarifa',
    loadChildren: () => import('./detalletarifa/detalletarifa.module').then( m => m.DetalletarifaPageModule)
  },
  {
    path: 'detallehabitacion',
    loadChildren: () => import('./detallehabitacion/detallehabitacion.module').then( m => m.DetallehabitacionPageModule)
  },
  {
    path: 'formularioreservacion',
    loadChildren: () => import('./formularioreservacion/formularioreservacion.module').then( m => m.FormularioreservacionPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'modal-busqueda-agencia',
    loadChildren: () => import('./modal-busqueda-agencia/modal-busqueda-agencia.module').then( m => m.ModalBusquedaAgenciaPageModule)
  },
  {
    path: 'modalcupon',
    loadChildren: () => import('./modalcupon/modalcupon.module').then( m => m.ModalcuponPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
