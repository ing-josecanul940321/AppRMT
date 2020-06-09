import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallereservacionPageRoutingModule } from './detallereservacion-routing.module';

import { DetallereservacionPage } from './detallereservacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallereservacionPageRoutingModule
  ],
  declarations: [DetallereservacionPage]
})
export class DetallereservacionPageModule {}
