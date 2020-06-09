import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorPageRoutingModule } from './buscador-routing.module';

import { BuscadorPage } from './buscador.page';
import { TarifasPage } from '../tarifas/tarifas.page';
import { TarifasPageModule } from '../tarifas/tarifas.module';


@NgModule({
  entryComponents:[
    TarifasPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorPageRoutingModule,
    TarifasPageModule
  ],
  declarations: [BuscadorPage]
})
export class BuscadorPageModule {}
