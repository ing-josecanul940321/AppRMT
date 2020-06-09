import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalcuponPage } from './modalcupon.page';

const routes: Routes = [
  {
    path: '',
    component: ModalcuponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalcuponPageRoutingModule {}
