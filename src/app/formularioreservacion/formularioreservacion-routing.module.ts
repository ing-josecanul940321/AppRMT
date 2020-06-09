import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioreservacionPage } from './formularioreservacion.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioreservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioreservacionPageRoutingModule {}
