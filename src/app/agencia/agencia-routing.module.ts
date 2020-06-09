import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenciaPage } from './agencia.page';

const routes: Routes = [
  {
    path: '',
    component: AgenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciaPageRoutingModule {}
