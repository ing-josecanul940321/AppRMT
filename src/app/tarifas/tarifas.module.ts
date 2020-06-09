import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifasPageRoutingModule } from './tarifas-routing.module';

import { TarifasPage } from './tarifas.page';
import { DetalletarifaPage } from '../detalletarifa/detalletarifa.page';
import { DetalletarifaPageModule } from '../detalletarifa/detalletarifa.module';


@NgModule({
  entryComponents:[
    DetalletarifaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifasPageRoutingModule,
    DetalletarifaPageModule
  ],
  declarations: [TarifasPage]
})
export class TarifasPageModule {}
