import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallehabitacionPageRoutingModule } from './detallehabitacion-routing.module';

import { DetallehabitacionPage } from './detallehabitacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallehabitacionPageRoutingModule
  ],
  declarations: [DetallehabitacionPage]
})
export class DetallehabitacionPageModule {}
