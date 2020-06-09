import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../provider/api.service';

@Component({
  selector: 'app-modal-busqueda-agencia',
  templateUrl: './modal-busqueda-agencia.page.html',
  styleUrls: ['./modal-busqueda-agencia.page.scss'],
})
export class ModalBusquedaAgenciaPage {
  itemsAgencia:any=[];
  constructor(
    private modalController: ModalController,
    public api:ApiService
  ) { }

  async closeModal(ev:any) {
    let val = ev;
    await this.modalController.dismiss(val);
  }

  searchAgencia(ev:any){
    let val =ev.target.value;
    this.api.http.get('https://www.rutamayatravel.com/sur4/admin/agencias/busquedaAgencias?search='+val).subscribe(data => {       
      this.itemsAgencia = data;
    });
  }

  salirModal(){
    this.modalController.dismiss()
  }

  // val && val.trim()!='' && val.length >= 3

}
