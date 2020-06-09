import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBusquedaAgenciaPageRoutingModule } from './modal-busqueda-agencia-routing.module';

import { ModalBusquedaAgenciaPage } from './modal-busqueda-agencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBusquedaAgenciaPageRoutingModule
  ],
  declarations: [ModalBusquedaAgenciaPage]
})
export class ModalBusquedaAgenciaPageModule {}
