import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallereservacionPage } from './detallereservacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetallereservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallereservacionPageRoutingModule {}
