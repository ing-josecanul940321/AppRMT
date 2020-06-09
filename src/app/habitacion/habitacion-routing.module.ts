import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitacionPage } from './habitacion.page';

const routes: Routes = [
  {
    path: '',
    component: HabitacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitacionPageRoutingModule {}
