import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalcuponPageRoutingModule } from './modalcupon-routing.module';

import { ModalcuponPage } from './modalcupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalcuponPageRoutingModule
  ],
  declarations: [ModalcuponPage]
})
export class ModalcuponPageModule {}
