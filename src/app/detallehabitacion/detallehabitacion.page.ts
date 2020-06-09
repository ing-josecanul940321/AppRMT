import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BuscadorService } from '../provider/buscador.service';


@Component({
  selector: 'app-detallehabitacion',
  templateUrl: './detallehabitacion.page.html',
  styleUrls: ['./detallehabitacion.page.scss'],
})
export class DetallehabitacionPage implements OnInit {

  @Input() Plan;
  @Input() Fechas;
  @Input() Politicas;
  @Input() Total;
  @Input() Promocion;
  @Input() Habitaciones;

  proveedor:any;
  idAgencia:any=localStorage.id_agencia;

  constructor(public modalCtrl: ModalController, public activatedRoute: ActivatedRoute,
    public buscador:BuscadorService) { 
    this.proveedor = localStorage.getItem('Proveedor');
  }

  ngOnInit() {
  }

  salirModal()
  {
    this.modalCtrl.dismiss();
  }
}
