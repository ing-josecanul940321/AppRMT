import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalletarifaPage } from './detalletarifa.page';

const routes: Routes = [
  {
    path: '',
    component: DetalletarifaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalletarifaPageRoutingModule {}
