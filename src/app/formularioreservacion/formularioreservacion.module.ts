import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioreservacionPageRoutingModule } from './formularioreservacion-routing.module';

import { FormularioreservacionPage } from './formularioreservacion.page';

import { ModalBusquedaAgenciaPageModule } from '../modal-busqueda-agencia/modal-busqueda-agencia.module';

import { ModalcuponPageModule } from '../modalcupon/modalcupon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioreservacionPageRoutingModule,
    ModalBusquedaAgenciaPageModule,
    ModalcuponPageModule
  ],
  declarations: [FormularioreservacionPage]
})
export class FormularioreservacionPageModule {}
