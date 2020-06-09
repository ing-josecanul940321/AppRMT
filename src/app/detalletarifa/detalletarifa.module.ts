import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalletarifaPageRoutingModule } from './detalletarifa-routing.module';

import { DetalletarifaPage } from './detalletarifa.page';
import { DetallehabitacionPageModule } from '../detallehabitacion/detallehabitacion.module';

@NgModule({
  entryComponents:[
    DetalletarifaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalletarifaPageRoutingModule,
    DetallehabitacionPageModule
  ],
  declarations: [DetalletarifaPage]
})
export class DetalletarifaPageModule {}
