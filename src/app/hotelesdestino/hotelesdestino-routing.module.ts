import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelesdestinoPage } from './hotelesdestino.page';

const routes: Routes = [
  {
    path: '',
    component: HotelesdestinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelesdestinoPageRoutingModule {}
