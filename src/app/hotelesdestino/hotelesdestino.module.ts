import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotelesdestinoPageRoutingModule } from './hotelesdestino-routing.module';

import { HotelesdestinoPage } from './hotelesdestino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HotelesdestinoPageRoutingModule
  ],
  declarations: [HotelesdestinoPage]
})
export class HotelesdestinoPageModule {}
