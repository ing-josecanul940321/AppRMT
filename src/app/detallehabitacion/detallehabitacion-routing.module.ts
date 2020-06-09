import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallehabitacionPage } from './detallehabitacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetallehabitacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallehabitacionPageRoutingModule {}
