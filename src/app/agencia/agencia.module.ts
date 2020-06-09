import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenciaPageRoutingModule } from './agencia-routing.module';

import { AgenciaPage } from './agencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenciaPageRoutingModule
  ],
  declarations: [AgenciaPage]
})
export class AgenciaPageModule {}
